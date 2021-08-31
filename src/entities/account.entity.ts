import { Role } from '../dto/account.dto';
import { Room } from './room.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('increment')
  pk: number;

  @Column({ type: 'uuid', unique: true, generated: 'uuid' })
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Student,
  })
  role: Role;

  @Column({ select: false, type: 'varchar' })
  password: string;

  @ManyToMany(() => Room, (room) => room.students)
  rooms: Account[];
}
