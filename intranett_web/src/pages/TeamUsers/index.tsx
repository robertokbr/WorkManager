import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Title, Users } from './styles';
import userAvatar from '../../assets/avatar.jpg';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface UserData {
  id: string;
  name: string;
  password: string;
}
interface Response {
  provider: UserData;
  members: UserData[];
}

const CreateTeamUsers: React.FC = () => {
  const [teamUsers, setTeamUsers] = useState<UserData[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get<Response>(`/team/${user.id}`)
      .then(response => setTeamUsers(response.data.members));
  }, [user.id]);

  return (
    <Container>
      <Title>Selecione os usuarios</Title>
      <Users>
        {teamUsers.map(teamUser => (
          <Link to={`/userTeamDashboard/${teamUser.id}`} key={teamUser.id}>
            <img src={userAvatar} alt={teamUser.name} />
            <div>
              <strong>{teamUser.name}</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </Container>
  );
};

export default CreateTeamUsers;
