import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppointmentModel } from '../database/models/appointment.model';
import { ModelClass } from 'objection';
import { config } from '../../config';

@Injectable()
export class SlotsService {
  constructor(
    @Inject('AppointmentModel')
    private appointmentModel: ModelClass<AppointmentModel>,
  ) {}

  async getSlots(date: string) {
    try {
      const { start, end, duration, slots } = config;

      const day = new Date(date).getDay();
      if (!config.days.includes(day)) {
        throw new HttpException(
          'this day is not available',
          HttpStatus.BAD_REQUEST,
        );
      }

      let startTime = new Date(`${date}T${start}`).getTime();
      const endTime = new Date(`${date}T${end}`).getTime();
      const times = [];

      while (startTime < endTime) {
        const time = new Date(startTime);
        const hours = time.getHours().toString().charAt(1)
          ? time.getHours()
          : `0${time.getHours()}`;
        const mintues = time.getMinutes() === 0 ? '00' : time.getMinutes();

        times.push({
          start: `${hours}:${mintues}`,
          slots,
          date,
        });
        startTime = startTime + duration;
      }

      const bookedslots = await this.appointmentModel
        .query()
        .where('date', '=', date);

      if (bookedslots.length) {
        times.forEach((time) => {
          bookedslots.forEach((booked) => {
            if (String(time.start) === String(booked.start)) {
              time.slots = booked.slots;
            }
          });
        });
      }

      return times;
    } catch (e) {
      throw e;
    }
  }

  async createAppointment(appointment: Appointment) {
    try {
      const { start, date } = appointment;

      // check availability

      const checkAvailable = await this.getSlots(date);

      for (const time of checkAvailable) {
        if (time.start === start && time.slots > 0) {
          // calculate end time
          const endTime =
            new Date(`${date}T${start}`).getTime() + config.duration;
          const endTimeFormatted = new Date(endTime);
          const hours = endTimeFormatted.getHours().toString().charAt(1)
            ? endTimeFormatted.getHours()
            : `0${endTimeFormatted.getHours()}`;
          const mintues =
            endTimeFormatted.getMinutes() === 0
              ? '00'
              : endTimeFormatted.getMinutes();

          const newBooking = {
            start,
            date,
            slots: time.slots - 1,
            end: `${hours}:${mintues}`,
          };

          return await this.appointmentModel
            .query()
            .insert(newBooking)
            .returning('*');
        }
      }

      throw new HttpException(
        'this slot is not available',
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      throw e;
    }
  }
}

interface Appointment {
  date: string;
  start: string;
}
