import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotFound extends HttpException {
  constructor(message: string = 'Not found') {
    super(message, HttpStatus.NO_CONTENT);
  }
}
