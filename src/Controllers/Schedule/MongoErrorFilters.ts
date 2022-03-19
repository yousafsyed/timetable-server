import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoServerError)
export class MongoErrorFilters implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message, statusCode;
    switch (exception.code) {
      case 11000:
        message = 'Already Exists';
        statusCode = 400;
        break;
      default:
        message = 'Unknown DB error';
        statusCode = 500;
        break;
    }

    response.status(statusCode).json({
      statusCode: exception.code,
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
