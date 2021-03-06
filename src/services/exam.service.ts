import { queryDto } from 'src/dto/query.dto';
import { Account } from '../entities/account.entity';
import { Room } from '../entities/room.entity';
import { Option } from '../entities/option.entity';
import { Question } from '../entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateExamDto } from '../dto/exam.dto';
import { Exam } from '../entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam) private examsRepo: Repository<Exam>,
    @InjectRepository(Question) private questionsRepo: Repository<Question>,
    @InjectRepository(Option) private optionsRepo: Repository<Option>,
    @InjectRepository(Room) private roomsRepo: Repository<Room>,
    @InjectRepository(Account) private accountsRepo: Repository<Account>,
  ) {}

  async getAll(queries: queryDto): Promise<Exam[]> {
    return this.examsRepo.find({
      relations: queries.include ? queries.include.split(',') : [],
    });
  }

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    try {
      const { proctors, students, startTime, endTime, name, questions } =
        createExamDto;
      console.log(questions);
      if (
        !proctors ||
        !students ||
        !startTime ||
        !endTime ||
        !name ||
        !questions
      ) {
        throw new BadRequestException();
      }

      const exam = this.examsRepo.create({
        name: name,
        questions: [],
        rooms: [],
      });

      // Create Questions & Options
      questions.forEach(async (q) => {
        const questionObj = this.questionsRepo.create({
          question: q.question,
          options: [],
        });

        q.options.forEach((op) => {
          const optionObj = this.optionsRepo.create({
            option: op.option,
            isCorrect: op.isCorrect,
          });

          questionObj.options.push(optionObj);
        });

        exam.questions.push(questionObj);
      });

      // Create Rooms

      const noOfStudentsPerRoom = students.length / proctors.length;

      let offset = 0;

      // Add Proctors
      for (let proctorIdx = 0; proctorIdx < proctors.length; proctorIdx++) {
        try {
          // Ger Proctor
          const proctor = await this.accountsRepo.findOneOrFail({
            id: proctors[proctorIdx],
          });

          const room = this.roomsRepo.create({
            name: `${createExamDto.name}-Room #${proctorIdx + 1}`,
            proctor,
            students: [],
            startTime,
            endTime,
          });

          // Add Students
          for (
            let studentIdx = 0;
            studentIdx < noOfStudentsPerRoom;
            studentIdx++
          ) {
            const student = await this.accountsRepo.findOneOrFail({
              id: students[studentIdx + offset],
            });

            room.students.push(student);
          }
          offset += room.students.length;

          exam.rooms.push(room);
        } catch (err) {
          console.log('Room: ', err.message);
          throw new NotFoundException();
        }
      }

      return this.examsRepo.save(exam);
    } catch (err) {
      console.log('Exam: ', err.message);
      if (err.message === 'Not Found') {
        throw new NotFoundException();
      }
      throw new BadRequestException();
    }
  }
}
