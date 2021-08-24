import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Exam } from './entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  controllers: [],
  providers: [],
})
export class ExamModule {}
