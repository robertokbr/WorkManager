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
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamptz')
  started_at: Date;

  @Column('timestamptz')
  finished_at: Date;

  @Column()
  cancellationReason: string;
}

export default Task;
