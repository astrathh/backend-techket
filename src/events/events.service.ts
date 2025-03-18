import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';

const prisma = new PrismaClient();

@Injectable()
export class EventsService {
  async findAll() {
    return prisma.event.findMany();
  }

  async findOne(id: number) {
    return prisma.event.findUnique({ where: { id } });
  }

  async create(createEventDto: CreateEventDto) {
    return prisma.event.create({
      data: createEventDto,
    });
  }
}
