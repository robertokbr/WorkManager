import {Router, response, request} from 'express';
import CreateTaskService from '../services/CreateTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const taskRouter = Router();
taskRouter.use(ensureAuthenticated);

taskRouter.get('/:id', async (request, response)=>{
const {id} = request.params;
console.log(id);

})

taskRouter.post('/', async (request, response)=>{
const {taskName, user_id, started_at } = request.body;
const createTask = new CreateTaskService();
const task = createTask.execute({ taskName, user_id, started_at});
return response.json(task);
});


taskRouter.put('/', async (request, response)=>{

  const {user_id, task_id, status, cancellationReason, finished_at } = request.body;
  const updateTask = new UpdateTaskService();
  const newTask = updateTask.execute({user_id, task_id, status, cancellationReason, finished_at})
  return response.json(newTask);
});





export default taskRouter;