import React, { useState, useEffect, useCallback } from 'react';
import {
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiXCircle,
  FiCheckCircle,
} from 'react-icons/fi';
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

interface TaskOperation {
  task?: TaskContent;
  operation: 'addTask' | 'detailTask' | 'cancelTask' | 'finishTask';
}

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
  const [taskFunction, setTaskFunction] = useState<TaskOperation | void>();
  const { user, token } = useAuth();

  useEffect(() => {
    const data = api
      .get(`/task/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const currentTask = response.data.filter(
          (task: TaskContent) => task.status === 'Andamento',
        );
        const finishedTask = response.data.filter(
          (task: TaskContent) => task.status === 'Finalizada',
        );
        const canceledTask = response.data.filter(
          (task: TaskContent) => task.status === 'Cancelada',
        );

        setAllTask([...currentTask, ...finishedTask, ...canceledTask]);
      });
  }, [user.id, token]);

  const handleGetFormatedData = useCallback((data: Date) => {
    if (!data) return;
    const localDate = new Date(data).toLocaleDateString('pt-br');
    const localTime = new Date(data).toLocaleTimeString('pt-br');
    const completDate = `${localDate} as ${localTime}`;
    return completDate;
  }, []);

  const handleAddTask = useCallback(
    (value: TaskContent) => {
      if (taskFunction && taskFunction.operation === 'addTask') {
        setAllTask(state => [...state, value]);
        setTaskFunction();
        return;
      }
      const filteredTasks = allTask.filter(task => task.id !== value.id);
      setAllTask([...filteredTasks, value]);
      setTaskFunction();
    },
    [taskFunction, allTask],
  );

  return (
    <>
      {taskFunction && (
        <FloatForm
          taskFunction={taskFunction}
          returnTask={value => {
            handleAddTask(value);
          }}
        >
          <button
            className="cancel"
            onClick={() => {
              setTaskFunction();
            }}
            type="button"
          >
            Fechar
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
            <button
              type="button"
              onClick={() => {
                setTaskFunction({ operation: 'addTask' });
              }}
            >
              <h1 data-testid="balance-total">Criar tarefa</h1>
              <FiCalendar size={30} />
            </button>
          </ButtonDashboard>
        </ButtonContainer>

        <TableContainer formIsVisible={Number(!!taskFunction)}>
          <table>
            <thead>
              <tr>
                <th>Tárefa</th>
                <th>Ínicio</th>
                <th>Término</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {allTask.map(task => (
                <tr
                  onClick={() => {
                    setTaskFunction({ task, operation: 'detailTask' });
                  }}
                  key={task.id}
                >
                  <td className="first">{task.name}</td>
                  <td>{handleGetFormatedData(task.started_at)}</td>
                  <td>{handleGetFormatedData(task.finished_at)}</td>
                  <td className={task.status}>{task.status}</td>

                  <td id="last">
                    {task.status === 'Andamento' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setTaskFunction({ task, operation: 'cancelTask' });
                            console.log('hello');
                          }}
                        >
                          <FiXCircle size={25} />
                        </button>

                        <button type="button">
                          <FiCheckCircle size={25} />
                        </button>
                      </>
                    )}
                  </td>
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
