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
  user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  userId: User;

  @Column('timestamp')
  started_at: Date;

  @Column('timestamp')
  finished_at: Date;

  @Column()
  cancellationReason: string;
}

export default Task;
