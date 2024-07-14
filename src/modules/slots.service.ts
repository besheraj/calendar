import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotsService {

  async getMinutes(start: string, end: string) {
  
    let startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    const duration = 1000 * 60 * 30;
    const addTimeZone = 1000 * 60 * 480
    const times = [];

    while(startTime < endTime) {

      times.push({
        startTime: new Date(startTime +  addTimeZone),
        endTime: new Date(startTime + duration + addTimeZone)
      })
      startTime = startTime + duration
    }
    return times
  }

}
