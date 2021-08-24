import { Exam } from 'src/exam/entities/exam.entity';
import { Account } from './../../account/entities/account.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account)
  proctor: Account;

  @ManyToMany(() => Account)
  @JoinTable()
  students: Account;

  @ManyToOne(() => Exam, (e) => e.rooms)
  exam: Exam;
}
