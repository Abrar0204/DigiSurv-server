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
        { relations: ['options', 'exam'] },
      );

      const options = question.options.filter((o) =>
        createAnswerDto.chosenOptionIds.includes(o.id),
      );

      const existingAnswers = await this.answersRepo.findOne({
        where: {
          student,
          question,
        },
      });
      console.log(student, question, options);

      if (existingAnswers) {
        console.log('existing');
        existingAnswers.chosenAnswers = options;

        return this.answersRepo.save(existingAnswers);
      }

      const answer = this.answersRepo.create({
        student,
        question,
        chosenAnswers: options,
        exam: question.exam,
      });

      return this.answersRepo.save(answer);
    } catch (err) {
      console.log(err.message);
      throw new NotFoundException();
    }
  }

  async getAnswerByExamAndQuestion(sId, eId): Promise<Answer[] | null> {
    try {
      const answers = await this.answersRepo.find({
        relations: [
          'student',
          'exam',
          'question',
          'question.options',
          'chosenAnswers',
        ],
        where: {
          student: { id: sId },
          // question: { id: qId },
          exam: { id: eId },
        },
      });
      answers.forEach((a) => {
        a.chosenAnswers = a.chosenAnswers.map((o) => ({
          ...o,
          isCorrect: undefined,
        }));
      });
      return answers;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  }
}
