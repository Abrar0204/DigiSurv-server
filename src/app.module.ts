import { config } from '../ormconfig';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { ExamModule } from './exam/exam.module';
import { RoomModule } from './room/room.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AccountModule,
    ExamModule,
    RoomModule,
    QuestionModule,
    OptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
