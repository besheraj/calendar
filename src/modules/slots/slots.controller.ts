import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotDto } from 'src/dto/slot.dto';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getSlots(@Query() query: { date: string }) {
    try {
      return this.slotsService.getSlots(query.date);
    } catch (e) {
      throw e;
    }
  }

  @Post()
  async createSLot(@Body() body: SlotDto) {
    try {
      return this.slotsService.createAppointment(body);
    } catch (e) {
      throw e;
    }
  }
}
