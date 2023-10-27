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

  @Get(':page?')
  getEvents(
    @Param(
      'page',
      new ParseIntPipe({
        optional: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    page: number | null,
    @Query() search: SearchEventDto,
  ): Promise<Event[]> {
    return this.eventsService.findAll(page || 1, search);
  }

  @Post('/add')
  async postEvent(@Body() body: CreateEventDto): Promise<Event> {
    return this.eventsService.insertOne(body);
  }

  @Patch('/update/:id')
  patchEvent(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() body: CreateEventDto,
  ): Promise<Event | null> {
    return this.eventsService.updateOne(id, body);
  }

}
