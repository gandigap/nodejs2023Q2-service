import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { LoggerService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      this.logError(status, exception);

      res.status(status).json(exception.getResponse());
    } else {
      this.logError(HttpStatus.INTERNAL_SERVER_ERROR, exception);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }

  private logError(status: number, exception: any) {
    if (status.toString().startsWith('4')) {
      this.loggerService.warn(`Client error: ${exception.message}.`);
    } else if (status.toString().startsWith('5')) {
      this.loggerService.error(`Server error:${exception.message}.`);
    }
  }
}
