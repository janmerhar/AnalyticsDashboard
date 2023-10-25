import { HttpException } from '@nestjs/common';

const DUPLICATE_RECORD = 409;

export class EventAlreadyExists extends HttpException {
  constructor() {
    super('id', DUPLICATE_RECORD);
  }
}
