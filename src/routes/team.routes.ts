import { Router, response } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateTeamService from '../services/CreateTeamService';
import { getRepository, In } from 'typeorm';
import Team from '../models/Team';
import User from '../models/User';

const teamRouter = Router();
teamRouter.use(ensureAuthenticated)

teamRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { manager_id, users_id } = request.body;
  const creaetTeam = new CreateTeamService();
  const team = await creaetTeam.execute({manager_id, users_id});
  return response.json(team);
});

teamRouter.get('/:manager_id', async (request, response)=>{
  const {manager_id} = request.params;
  const teamRepository = getRepository(Team);
  const userRepository  = getRepository(User); 
  const users_id =  (await teamRepository.find({where:{manager_id}})).map( response => response.user_id)
  console.log(users_id)
  const teamUsers = await userRepository.find({where:{ id: In(users_id) }})
  return response.json(teamUsers)
})


export default teamRouter;
