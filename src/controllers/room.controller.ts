import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoomService } from '../services/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  getAll(@Query() q) {
    return this.roomService.getAll(q);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Query() q) {
    return this.roomService.getOne(id, q);
  }
}
