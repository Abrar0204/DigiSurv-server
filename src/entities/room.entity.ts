import { Exam } from './exam.entity';
import { Account } from './account.entity';
import {
  Column,
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

  @Column('varchar')
  name: string;

  @ManyToOne(() => Account)
  @JoinTable()
  proctor: Account;

  @ManyToMany(() => Account, { cascade: true })
  @JoinTable()
  students: Account[];

  @ManyToOne(() => Exam, (e) => e.rooms)
  exam: Exam;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;
}
