import { getRepository } from 'typeorm';
import User from '../models/User';
import Team from '../models/Team';

interface Request {
  provider_id: string;
  users_id: string[];
}

class CreateTeamService {
  public async execute({provider_id, users_id}: Request): Promise<void> {
    const userRepository = getRepository(User);
    const teamRepository = getRepository(Team);
    
    const checkIfUserIsManager = await userRepository.findOne({where:{id:provider_id}});
    
    if(!checkIfUserIsManager || checkIfUserIsManager.isManager !== false ) {
      throw new Error('User need to be a manager to create a team!')
    }

   const team = users_id.map( user => (
     teamRepository.create({
       user_id: user,
       provider_id
     })
   ));
    await teamRepository.save(team);  
    return;
  }
}

export default CreateTeamService;
