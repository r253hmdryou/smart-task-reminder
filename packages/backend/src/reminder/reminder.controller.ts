import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { ReminderService } from './reminder.service';
import { ReminderCreationDto, ReminderResponseDto } from './reminder.dto';

@Controller('/reminders')
@UsePipes(ZodValidationPipe)
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async getReminders(): Promise<ReminderResponseDto[]> {
    return await this.reminderService.getReminders();
  }

  @Post()
  async postReminders(
    @Body() reminderCreationDto: ReminderCreationDto,
  ): Promise<ReminderResponseDto> {
    return await this.reminderService.postReminders(reminderCreationDto);
  }
}
