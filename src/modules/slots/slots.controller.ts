import { Controller, Get } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getSlots() {
    const date = '2024-04-13' // query
    const start = '09:00' // config
    const end = '18:00' // config

    return this.slotsService.getMinutes(date,start,end);
  }
}
