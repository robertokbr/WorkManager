import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateTeamService from '../services/CreateTeamService';

const teamRouter = Router();
teamRouter.use(ensureAuthenticated)

teamRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { provider_id, users_id } = request.body;
  const creaetTeam = new CreateTeamService();
  creaetTeam.execute({provider_id, users_id});
  return response.status(201);
});

export default teamRouter;
