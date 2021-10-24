import { Role } from './../dto/account.dto';
import { CreateExamDto } from '../dto/exam.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExamService } from '../services/exam.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { queryDto } from 'src/dto/query.dto';
@Controller('/exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Request() req, @Query() q: queryDto) {
    if (req.account.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    return this.examService.getAll(q);
  }

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }
}
