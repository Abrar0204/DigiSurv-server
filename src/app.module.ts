import { CallModule } from './modules/call.module';
import { AnswerModule } from './modules/answer.module';
import { config } from '../ormconfig';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account.module';
import { ExamModule } from './modules/exam.module';
import { RoomModule } from './modules/room.module';
import { QuestionModule } from './modules/question.module';
import { OptionModule } from './modules/option.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AccountModule,
    ExamModule,
    RoomModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
    CallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
