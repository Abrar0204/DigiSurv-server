import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({ imports: [TypeOrmModule.forFeature([Question])] })
export class QuestionModule {}
