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
  date: Date;
  time: Date;
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
interface Response {
  returnTask: (task: TaskContent) => void;
}

const FloatForm: React.FC<Response> = ({ children, returnTask }) => {
  const { token } = useAuth();
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
  return (
    <Container>
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
    </Container>
  );
};

export default FloatForm;
