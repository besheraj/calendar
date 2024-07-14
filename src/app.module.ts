import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsModule } from './modules/slots/slots.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, SlotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
