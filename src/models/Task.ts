import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('task')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  name: string;

  @Column()
  status: 'Andamento' | 'Finalizada' | 'Cancelada';

  @Column()
  userId: string;

  @ManyToOne(() => User, {eager: true})
  @JoinColumn({ name: 'user' })
  user: User;

  @Column('timestamp')
  started_at: Date;

  @Column('timestamp')
  finished_at: Date;

  @Column()
  cancellationReason: string;
}

export default Task;
