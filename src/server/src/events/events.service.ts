import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { Event } from './schemas/event.schema';

import { EventNotFound } from './exceptions/event-not-found.exception';
import { EventAlreadyExists } from './exceptions/event-already-exists.exception';

@Injectable()
export class EventsService {
  private readonly PAGE_SIZE = 12;
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async insertOne(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = new this.eventModel(createEventDto);
      return await event.save();
    } catch (error) {
      throw new EventAlreadyExists();
    }
  }

}
