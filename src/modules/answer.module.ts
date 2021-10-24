import { Question } from './../entities/question.entity';
import { Account } from './../entities/account.entity';
import { Answer } from './../entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './../services/answer.service';
import { AnswerController } from './../controllers/answer.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Account, Question])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
