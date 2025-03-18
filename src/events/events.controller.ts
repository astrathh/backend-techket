import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
