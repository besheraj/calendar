import { Inject, Injectable } from '@nestjs/common';
import { AppointmentModel } from '../database/models/appointment.model';
import { ModelClass } from 'objection';

@Injectable()
export class SlotsService {
  constructor(
    @Inject('AppointmentModel')
    private appointmentModel: ModelClass<AppointmentModel>,
  ) {}

  async getMinutes(date: string, start: string, end: string) {
  
    let startTime = new Date(`${date}T${start}`).getTime();
    const endTime = new Date(`${date}T${end}`).getTime();

    const duration = 1000 * 60 * 30; // config
    const slots = 1 // config
    // const addTimeZone = 1000 * 60 * 480
    const times = [];

    while(startTime < endTime) {
      const time = new Date(startTime)
      const hours = time.getHours().toString().charAt(1) ? time.getHours() : `0${time.getHours()}`
      const mintues = time.getMinutes() === 0 ? '00' : time.getMinutes()

      times.push({
        start: `${hours}:${mintues}`,
        slots
      })
      startTime = startTime + duration
    }

    const bookedslots = await this.appointmentModel.query().where('date', '=', date)

    if (bookedslots.length) {
      times.forEach(time => {
        bookedslots.forEach( booked => {
          if (String(time.start) === String(booked.start)) {
            time.slots = booked.slots
          }
        })
      })
    }

    return times
  }

}
