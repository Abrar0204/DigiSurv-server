import { Account } from '../entities/account.entity';
import { ExamService } from '../services/exam.service';
import { ExamController } from '../controllers/exam.controller';
import { Option } from '../entities/option.entity';
import { Question } from '../entities/question.entity';
import { Room } from '../entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Exam } from '../entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Room, Question, Option, Account])],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
