import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, Reminder } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/reminders')
  getReminders(): Reminder[] {
    return this.appService.getReminders();
  }

  @Post('/reminders')
  postReminders(@Body() createReminderDto): Reminder {
    return this.appService.postReminders(createReminderDto);
  }
}
