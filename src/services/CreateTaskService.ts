import {getRepository} from 'typeorm';
import Task from '../models/Task';

interface Request{
  taskName: string;
  user_id: string;
  started_at?: Date;
}

class CreateTaskService{
  public async  execute({taskName, user_id, started_at}: Request): Promise<Task>{
    const taskRepository = getRepository(Task);
    const task =  taskRepository.create({
     name: taskName, user_id, started_at
    });
    await taskRepository.save(task);
    return task;
  }
}

export default CreateTaskService;

