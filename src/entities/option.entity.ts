import { Question } from './question.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @Column('varchar')
  option: string;

  @Column('boolean')
  isCorrect: boolean;

  @ManyToOne(() => Question, (q) => q.options)
  question: Question;
}
