import React, { useState, useEffect, useCallback } from 'react';
import { FiArrowDown, FiArrowUp, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header';
import {
  Container,
  ButtonContainer,
  ButtonDashboard,
  TableContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface TaskContent {
  id: string;
  name: string;
  status: 'Cancelada' | 'Andamento' | 'Finalizada';
  user: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
}

const UserTeamDashboard: React.FC = () => {
  const [allTask, setAllTask] = useState<TaskContent[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/task/${user.id}`).then(response => setAllTask(response.data));
  }, [user.id]);

  const handleCreateTask = useCallback(() => {
    console.log('ola mundo');
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ButtonContainer>
          <ButtonDashboard>
            <Link to="/createTeam">
              <FiArrowDown />
              <h1 data-testid="balance-income">Criar time</h1>
            </Link>
          </ButtonDashboard>
          <ButtonDashboard>
            <Link to="/teamUsers">
              <FiArrowUp />
              <h1 data-testid="balance-outcome">Visualizar time</h1>
            </Link>
          </ButtonDashboard>
          <ButtonDashboard>
            <button type="button" onClick={handleCreateTask}>
              <FiBox />
              <h1 data-testid="balance-total">Criar tarefa</h1>
            </button>
          </ButtonDashboard>
        </ButtonContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Tárefa</th>
                <th>Ínicio</th>
                <th>Término</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {allTask.map(task => (
                <tr key={task.id}>
                  <td className="title">{task.name}</td>
                  <td>{task.started_at}</td>
                  <td>{task.finished_at}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default UserTeamDashboard;
