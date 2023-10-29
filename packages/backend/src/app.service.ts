import { Injectable } from '@nestjs/common';

import { PrismaService } from './vendors/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
