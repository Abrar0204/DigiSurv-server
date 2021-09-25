import { Role } from './../dto/account.dto';
import { AnswerService } from './../services/answer.service';
import { CreateAnswerDto } from './../dto/answer.dto';
import { AuthGuard } from './../guards/auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Body,
  Param,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';

@Controller('/answer')
@UseGuards(AuthGuard)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Patch('/')
  createAnswer(@Request() req, @Body() createAnswerDto: CreateAnswerDto) {
    if (req.account.role !== Role.Student) {
      throw new UnauthorizedException();
    }
    return this.answerService.createAnswer(req.account.id, createAnswerDto);
  }

  @Get('/')
  getAllAnswers() {
    return 'answer';
  }

  @Get('/:eId')
  getAnswerByExamAndQuestion(@Request() req, @Param() p: { eId: string }) {
    if (req.account.role !== Role.Student) {
      throw new UnauthorizedException();
    }

    return this.answerService.getAnswerByExamAndQuestion(req.account.id, p.eId);
  }
}
