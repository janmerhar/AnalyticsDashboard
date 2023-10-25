import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotValid extends HttpException {
  constructor(field: string) {
    super(field, HttpStatus.NO_CONTENT);
  }
}
