import { queryDto } from './../dto/query.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomsRepo: Repository<Room>) {}

  async getAll(queries: queryDto): Promise<Room[]> {
    const unfilteredData = await this.roomsRepo.find({
      relations: queries.include ? queries.include.split(',') : [],
    });

    if (queries.filter?.student) {
      return unfilteredData.filter((item) =>
        item.students.find((s) => s.id === queries.filter.student),
      );
    }

    if (queries.filter?.proctor) {
      return unfilteredData.filter(
        (item) => item.proctor.id === queries.filter.proctor,
      );
    }
    // console.log(queries);
    return unfilteredData;
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
