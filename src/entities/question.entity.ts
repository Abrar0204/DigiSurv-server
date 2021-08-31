import { Option } from './option.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @Column('varchar')
  question: string;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];

  @ManyToOne(() => Exam, (e) => e.questions)
  exam: Exam;
}
