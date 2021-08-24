import { Room } from './../../room/entities/room.entity';
import { Question } from './../../question/entities/question.entity';
import { Account } from './../../account/entities/account.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Account)
  @JoinTable()
  proctors: Account;

  @ManyToMany(() => Account)
  @JoinTable()
  students: Account;

  @OneToMany(() => Question, (q) => q.exam)
  questions: Question[];

  @OneToMany(() => Room, (r) => r.exam)
  rooms: Room[];
}
