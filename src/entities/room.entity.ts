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
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @ManyToOne(() => Account)
  @JoinTable()
  proctor: Account;

  @ManyToMany(() => Account, (student) => student.rooms, { cascade: true })
  @JoinTable()
  students: Account[];

  @ManyToOne(() => Exam, (e) => e.rooms)
  exam: Exam;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;
}
