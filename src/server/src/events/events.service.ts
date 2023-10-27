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

  async findAll(page: number, search: SearchEventDto): Promise<Event[]> {
    let query;

    if (search.query?.length > 0) {
      if (search.searchby == 'name') {
        const regex = new RegExp(search.query, 'i');
        query = this.eventModel.find({ name: regex });
      }

      if (search.searchby == 'id') {
        query = this.eventModel
          .find()
          .where('_id')
          .equals(parseInt(search.query as string));
      }
    } else {
      query = this.eventModel.find();
    }

    if (search.type) {
      query.where('type').equals(search.type);
    }

    if (search.priority) {
      query.where('priority').equals(search.priority);
    }

    if (search.sort) {
      query.sort({ [search.sort]: search.order == 'asc' ? 1 : -1 });
    }

    query.skip((page - 1) * this.PAGE_SIZE).limit(this.PAGE_SIZE);

    return query.exec();
  }

  async insertOne(createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = new this.eventModel(createEventDto);
      return await event.save();
    } catch (error) {
      throw new EventAlreadyExists();
    }
  }

  async updateOne(
    id: number,
    createEventDto: CreateEventDto,
  ): Promise<Event | null> {
    if (id == createEventDto._id) {
      await this.eventModel.updateOne({ _id: id }, createEventDto).exec();

      return this.eventModel.findById(createEventDto._id).exec();
    } else {
      const isNewIDAvailable = await this.eventModel
        .findById(createEventDto._id)
        .exec();

      if (isNewIDAvailable !== null) {
        throw new EventAlreadyExists();
      }

      const deleteResult = await this.eventModel.deleteOne({ _id: id }).exec();

      if (!deleteResult.deletedCount) {
        throw new EventNotFound();
      } else {
        return await this.insertOne(createEventDto);
      }
    }
  }

  async deleteOne(id: number): Promise<null> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new EventNotFound();
    }

    return null;
  }
}
