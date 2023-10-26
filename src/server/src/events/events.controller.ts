import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { SearchEventDto } from './dto/search-event.dto';
import { Event } from './schemas/event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
}
