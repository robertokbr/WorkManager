import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Title, Users } from './styles';
import userAvatar from '../../assets/avatar.jpg';
import api from '../../services/api';

interface UserData {
  id: string;
  name: string;
  password: string;
}

const CreateTeamUsers: React.FC = () => {
  const [users, setusers] = useState<UserData[]>([]);

  useEffect(() => {}, []);

  return (
    <Container>
      <Title>Selecione os usuarios</Title>
      <Users>
        {users.map(user => (
          <Link to={`/repository/${user.id}`} key={user.id}>
            <img src={userAvatar} alt={user.name} />
            <div>
              <strong>{user.name}</strong>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </Container>
  );
};

export default CreateTeamUsers;
