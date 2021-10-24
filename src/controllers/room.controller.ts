import { Role } from './../dto/account.dto';
import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { queryDto } from 'src/dto/query.dto';
import { RoomService } from '../services/room.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/room')
@UseGuards(AuthGuard)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Get()
  getAll(@Query() q: queryDto) {
    return this.roomService.getAll(q);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Query() q: queryDto, @Request() req) {
    let isStudent = false;
    if (req.account.role === Role.Student) {
      isStudent = true;
    }
    return this.roomService.getOne(id, q, isStudent);
  }
}
