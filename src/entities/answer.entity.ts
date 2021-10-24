import { Exam } from './exam.entity';
import { Option } from './option.entity';
import { Question } from './question.entity';
import { Account } from './account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @ManyToOne(() => Account, (s) => s.answers)
  @JoinColumn()
  student: Account;

  @ManyToOne(() => Question, (q) => q.answers)
  @JoinColumn()
  question: Question;

  @ManyToMany(() => Option)
  @JoinTable()
  chosenAnswers: Option[];

  @ManyToOne(() => Exam, (e) => e.answers)
  @JoinColumn()
  exam: Exam;
}
