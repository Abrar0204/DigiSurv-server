import { Option } from './option.entity';
import { Question } from './question.entity';
import { Account } from './account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @OneToOne(() => Account)
  @JoinColumn()
  student: Account;

  @OneToOne(() => Question)
  @JoinColumn()
  question: Question;

  @OneToOne(() => Option)
  @JoinColumn()
  chosenAnswer: Option;
}
