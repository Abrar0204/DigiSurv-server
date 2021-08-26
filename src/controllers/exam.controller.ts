import { CreateExamDto } from '../dto/create/create-exam.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ExamService } from '../services/exam.service';

@Controller('/exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }
}
