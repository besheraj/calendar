import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';

@Module({
  imports: [],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
