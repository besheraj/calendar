import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotsModule } from './modules/slots.module';

@Module({
  imports: [SlotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
