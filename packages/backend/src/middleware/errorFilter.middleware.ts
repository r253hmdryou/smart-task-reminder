import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (
      !(exception instanceof HttpException) ||
      exception.getStatus() === 500
    ) {
      // eslint-disable-next-line no-console
      console.error(exception);
      return response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
