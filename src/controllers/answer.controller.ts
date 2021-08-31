import { AnswerService } from './../services/answer.service';
import { CreateAnswerDto } from './../dto/answer.dto';
import { AuthGuard } from './../guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';

@Controller('/answer')
@UseGuards(AuthGuard)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('/')
  createAnswer(@Request() req, @Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(req.account.id, createAnswerDto);
  }

  @Get('/')
  getAllAnswers() {
    return 'answer';
  }
}
