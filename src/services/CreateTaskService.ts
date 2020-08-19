import {getRepository} from 'typeorm';
import Task from '../models/Task';

interface Request{
  taskName: string;
  user_id: string;
  status: 'Andamento' | 'Finalizada' | 'Cancelada';
  started_at?: Date;
}

class CreateTaskService{
  public async  execute({taskName, user_id, started_at, status}: Request): Promise<Task>{
    const taskRepository = getRepository(Task);
    const task =  taskRepository.create({
     name: taskName, user: user_id, started_at,status
    });
    await taskRepository.save(task);
    return task;
  }
}

export default CreateTaskService;

