import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "nestjs-zod";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { ReminderService } from "./reminder.service";
import { ReminderCreationDto, ReminderResponseDto } from "./reminder.dto";

@Controller("/reminders")
@ApiTags("reminder")
@UsePipes(ZodValidationPipe)
@ApiBadRequestResponse({ description: "リクエストの形式が正しくない" })
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  @ApiOperation({
    operationId: "getReminders",
    summary: "リマインダー一覧を取得する",
    description: "リマインダー一覧を取得する",
  })
  @ApiOkResponse({ type: ReminderResponseDto, isArray: true })
  async get(): Promise<ReminderResponseDto[]> {
    const reminders = await this.reminderService.findAll();
    return reminders.map((reminder) => {
      return reminder.toResponse();
    });
  }

  @Post()
  @ApiOperation({
    operationId: "createReminder",
    summary: "リマインダーを登録する",
    description: "リマインダーを登録する",
  })
  @ApiCreatedResponse({ type: ReminderResponseDto })
  async post(@Body() reminderCreationDto: ReminderCreationDto): Promise<ReminderResponseDto> {
    const reminder = await this.reminderService.create(reminderCreationDto);
    return reminder.toResponse();
  }

  @Get("/@completed")
  @ApiOperation({
    operationId: "getCompletedReminders",
    summary: "完了済みのリマインダー一覧を取得する",
    description: "完了済みのリマインダー一覧を取得する",
  })
  @ApiOkResponse({ type: ReminderResponseDto, isArray: true })
  async getCompleted(): Promise<ReminderResponseDto[]> {
    const reminders = await this.reminderService.findAllCompleted();
    return reminders.map((reminder) => {
      return reminder.toResponse();
    });
  }

  @Delete("/:id")
  @ApiOperation({
    operationId: "removeReminder",
    summary: "リマインダーを削除する",
    description: "リマインダーを削除する",
  })
  @ApiNoContentResponse()
  async deleteId(@Param("id") id: string): Promise<void> {
    const reminder = await this.reminderService.findByUuid(id);
    reminder.remove();
    await this.reminderService.save(reminder);
  }

  @Put("/:id/complete")
  @ApiOperation({
    operationId: "completeReminder",
    summary: "リマインダーを完了状態にする",
    description: "リマインダーを完了状態にする",
  })
  @ApiOkResponse()
  async putIdComplete(@Param("id") id: string): Promise<void> {
    const reminder = await this.reminderService.findByUuid(id);
    reminder.complete();
    await this.reminderService.save(reminder);
  }

  @Delete("/:id/complete")
  @ApiOperation({
    operationId: "uncompleteReminder",
    summary: "リマインダーの完了状態を取り消す",
    description: "リマインダーの完了状態を取り消す",
  })
  @ApiOkResponse()
  async deleteIdComplete(@Param("id") id: string): Promise<void> {
    const reminder = await this.reminderService.findByUuid(id);
    reminder.uncomplete();
    await this.reminderService.save(reminder);
  }
}
