import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppService } from './app.service';
import { ReminderCreationDto, ReminderResponseDto } from './app.dto';

@Controller()
@UsePipes(ZodValidationPipe)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/reminders')
  async getReminders(): Promise<ReminderResponseDto[]> {
    return await this.appService.getReminders();
  }

  @Post('/reminders')
  async postReminders(
    @Body() reminderCreationDto: ReminderCreationDto,
  ): Promise<ReminderResponseDto> {
    return await this.appService.postReminders(reminderCreationDto);
  }
}
