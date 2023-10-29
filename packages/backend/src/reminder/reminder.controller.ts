import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ReminderService } from './reminder.service';
import { ReminderCreationDto, ReminderResponseDto } from './reminder.dto';

@Controller('/reminders')
@ApiTags('reminder')
@UsePipes(ZodValidationPipe)
@ApiBadRequestResponse({ description: 'リクエストの形式が正しくない' })
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  @ApiOperation({
    operationId: 'getReminders',
    summary: 'リマインダー一覧を取得する',
    description: 'リマインダー一覧を取得する',
  })
  @ApiOkResponse({ type: ReminderResponseDto, isArray: true })
  async getReminders(): Promise<ReminderResponseDto[]> {
    return await this.reminderService.getReminders();
  }

  @Post()
  @ApiOperation({
    operationId: 'createReminder',
    summary: 'リマインダーを登録する',
    description: 'リマインダーを登録する',
  })
  @ApiCreatedResponse({ type: ReminderResponseDto })
  async postReminders(
    @Body() reminderCreationDto: ReminderCreationDto,
  ): Promise<ReminderResponseDto> {
    return await this.reminderService.postReminders(reminderCreationDto);
  }
}
