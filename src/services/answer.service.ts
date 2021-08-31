import { Account } from './../entities/account.entity';
import { Question } from './../entities/question.entity';
import { CreateAnswerDto } from './../dto/answer.dto';
import { Answer } from './../entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private answersRepo: Repository<Answer>,
    @InjectRepository(Account) private studentsRepo: Repository<Account>,
    @InjectRepository(Question) private questionsRepo: Repository<Question>,
  ) {}

  async createAnswer(
    studentId: string,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer> {
    try {
      const student = await this.studentsRepo.findOneOrFail({ id: studentId });
      const question = await this.questionsRepo.findOneOrFail(
        { id: createAnswerDto.questionId },
        { relations: ['options'] },
      );

      const option = question.options.find(
        (o) => o.id === createAnswerDto.chosenOptionId,
      );

      const answer = this.answersRepo.create({
        student,
        question,
        chosenAnswer: option,
      });

      return this.answersRepo.save(answer);
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException();
    }
  }
}
