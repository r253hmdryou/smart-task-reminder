import { Module } from '@nestjs/common';
import { PrismaModule } from '../vendors/prisma/prisma.module';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';

@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
