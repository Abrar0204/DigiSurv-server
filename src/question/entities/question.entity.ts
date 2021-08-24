import { Option } from './../../option/entities/option.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from 'src/exam/entities/exam.entity';
@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  question: string;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ManyToOne(() => Exam, (e) => e.questions)
  exam: Exam;
}
