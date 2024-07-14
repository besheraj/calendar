import { Controller, Get } from '@nestjs/common';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getSlots() {
    return this.slotsService.getMinutes("2024-04-13T09:00","2024-04-13T18:00");
  }
}
