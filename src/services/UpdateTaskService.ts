import {getRepository} from 'typeorm';
import Task from '../models/Task';

interface Request{
  user_id: string;
  task_id: string;
  status: 'Andamento' | 'Finalizada' | 'Cancelada';
  finished_at: Date;
  cancellationReason?: string;
}

class UpdateTaskService{
  public async execute({user_id, task_id, status, finished_at, cancellationReason}:Request):Promise<Task>{
    const taskRepository = getRepository(Task);
    const task = await taskRepository.findOne({ where: { id: task_id } });
    if(!task || task.user_id !== user_id){
      throw new Error(`You don't have permission to do it`);
    };
    task.status = status;
    task.finished_at = finished_at;
    if(cancellationReason){
      task.cancellationReason = cancellationReason;
    }
    await taskRepository.save(task);
    return task;
  };
};

export default UpdateTaskService;
