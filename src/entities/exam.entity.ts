import { Room } from './room.entity';
import { Question } from './question.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Question, (q) => q.exam, { cascade: true })
  questions: Question[];

  @OneToMany(() => Room, (r) => r.exam, { cascade: true })
  rooms: Room[];
}
