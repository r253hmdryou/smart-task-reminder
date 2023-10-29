import { Module } from '@nestjs/common';
import { ReminderModule } from './reminder/reminder.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ReminderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
