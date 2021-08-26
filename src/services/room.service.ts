import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomsRepo: Repository<Room>) {}

  async getAll(queries: { include?: string }): Promise<Room[]> {
    return this.roomsRepo.find({
      relations: queries.include ? queries.include.split(',') : [],
    });
  }

  async getOne(id: string, queries: { include?: string }): Promise<Room> {
    try {
      const room = await this.roomsRepo.findOneOrFail(id, {
        relations: queries.include ? queries.include.split(',') : [],
      });
      return room;
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException();
    }
  }
}
