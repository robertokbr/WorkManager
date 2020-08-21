import React, { useState, useEffect, useCallback } from 'react';
import { FiUserPlus, FiUsers, FiCalendar, FiXCircle } from 'react-icons/fi';
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
import FloatForm from '../../components/FloatForm';

interface TaskContent {
  id: string;
  name: string;
  status: 'Cancelada' | 'Andamento' | 'Finalizada';
  user: string;
  started_at: Date;
  finished_at: Date;
  cancellationReason: string;
}

const Dashboard: React.FC = () => {
  const [allTask, setAllTask] = useState<TaskContent[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    api
      .get(`/task/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setAllTask(response.data));
  }, [user.id, token]);

  const handleGetFormatedData = useCallback((data: Date) => {
    if (!data) return;
    const localDate = new Date(data).toLocaleDateString('pt-br');
    const localTime = new Date(data).toLocaleTimeString('pt-br');
    const completDate = `${localDate} as ${localTime}`;
    return completDate;
  }, []);
  const handleSetFormVisible = useCallback(() => {
    setFormVisible(state => !state);
  }, []);

  return (
    <>
      {formVisible && (
        <FloatForm
          returnTask={value => {
            setAllTask(state => [...state, value]);
            handleSetFormVisible();
          }}
        >
          <button
            className="cancel"
            onClick={handleSetFormVisible}
            type="button"
          >
            Cancelar
            <FiXCircle size={20} />
          </button>
        </FloatForm>
      )}
      <Header />
      <Container>
        <ButtonContainer>
          <ButtonDashboard>
            <Link to="/createTeam">
              <h1 data-testid="balance-income">Criar time</h1>
              <FiUserPlus size={30} />
            </Link>
          </ButtonDashboard>
          <ButtonDashboard>
            <Link to="/teamUsers">
              <h1 data-testid="balance-outcome">Visualizar time</h1>
              <FiUsers size={30} />
            </Link>
          </ButtonDashboard>
          <ButtonDashboard>
            <button type="button" onClick={handleSetFormVisible}>
              <h1 data-testid="balance-total">Criar tarefa</h1>
              <FiCalendar size={30} />
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
                  <td>{task.name}</td>
                  <td>{handleGetFormatedData(task.started_at)}</td>
                  <td>{handleGetFormatedData(task.finished_at)}</td>
                  <td className={task.status}>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
