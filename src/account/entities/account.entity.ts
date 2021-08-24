import { Room } from './../../room/entities/room.entity';
import { Exam } from './../../exam/entities/exam.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

type Role = 'student' | 'proctor' | 'admin';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  role: Role;

  @Column('varchar')
  email: string;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @ManyToMany(() => Exam)
  exams: Account[];

  @ManyToMany(() => Room)
  rooms: Account[];
}
