/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container, FloatFormContainer } from './styles';
import Input from '../Input';
import api from '../../services/api';
import Button from '../Button';
import { useAuth } from '../../hooks/auth';

interface TaskData {
  name: string;
  date?: Date;
  time?: Date;
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

interface TaskOperation {
  task?: TaskContent;
  operation: 'addTask' | 'detailTask' | 'cancelTask' | 'finishTask';
}

interface Props {
  returnTask: (task: TaskContent) => void;
  taskFunction: TaskOperation;
}

const FloatForm: React.FC<Props> = ({ children, returnTask, taskFunction }) => {
  const { token } = useAuth();
  const { task } = taskFunction;
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: TaskData) => {
      const formatedDate = new Date(`${data.date} ${data.time}`);
      try {
        await api
          .post(
            '/task',
            {
              taskName: data.name,
              started_at: formatedDate,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => returnTask(response.data));
      } catch (err) {
        alert('Dados invalidos');
      }
    },
    [token, returnTask],
  );
  const handleGetFormatedData = useCallback((data: Date) => {
    if (!data) return;
    const localDate = new Date(data).toLocaleDateString('pt-br');
    const localTime = new Date(data).toLocaleTimeString('pt-br');
    const completDate = `${localDate} as ${localTime}`;
    return completDate;
  }, []);

  const handleUpdate = useCallback(
    async data => {
      const formatedDate = new Date(`${data.date} ${data.time}`);

      try {
        await api
          .put(
            '/task',
            {
              task_id: task?.id,
              finished_at: formatedDate,
              cancellationReason: data.cancel,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then(response => returnTask(response.data));
      } catch (err) {
        alert('Dados invalidos');
      }
    },
    [token, returnTask, task],
  );

  if (task) {
    return (
      <Container>
        {taskFunction.operation === 'cancelTask' && (
          <FloatFormContainer>
            <h2>
              Cancelar Tarefa
              {taskFunction.task?.name}
            </h2>
            <strong>
              Início: <span>{task.started_at}</span>
            </strong>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="date" type="Date" />
              <Input name="time" type="Time" />
              <Input name="reason" placeholder="Motivo" />
              <Button type="submit">Adicionar</Button>
            </Form>
            {children}
          </FloatFormContainer>
        )}
        {taskFunction.operation === 'detailTask' && (
          <FloatFormContainer>
            <div>
              <h2>
                {task?.name} - {task?.status}
              </h2>
              <strong>
                Início: <span>{handleGetFormatedData(task.started_at)}</span>
              </strong>
              <strong>
                Término:
                <span>
                  {task.finished_at
                    ? handleGetFormatedData(task.finished_at)
                    : 'Tarefa em andamento'}
                </span>
              </strong>
              {task.cancellationReason && (
                <strong>
                  Motivo: <span>{task.cancellationReason}</span>
                </strong>
              )}
            </div>
            {task.status === 'Andamento' && (
              <Button type="button" onClick={handleUpdate}>
                Finalizar
              </Button>
            )}

            {children}
          </FloatFormContainer>
        )}
        {taskFunction.operation === 'finishTask' && (
          <FloatFormContainer>
            <div>
              <h2>{task?.name} - Andamento</h2>
              <strong>
                Início: <span>{handleGetFormatedData(task.started_at)}</span>
              </strong>
            </div>
            <Input name="date" type="Date" />
            <Input name="time" type="Time" />
            <Button type="button" onClick={handleUpdate}>
              Finalizar
            </Button>

            {children}
          </FloatFormContainer>
        )}
      </Container>
    );
  }

  return (
    <Container>
      {taskFunction.operation === 'addTask' && (
        <FloatFormContainer>
          <h1>Nova tarefa</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="name" placeholder="Nome da tarefa" />
            <Input name="date" type="Date" />
            <Input name="time" type="Time" />
            <Button type="submit">Adicionar</Button>
          </Form>
          {children}
        </FloatFormContainer>
      )}
    </Container>
  );
};

export default FloatForm;
