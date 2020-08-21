import styled from 'styled-components';
import { motion } from 'framer-motion';
import { shade } from 'polished';

export const Container = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const FloatFormContainer = styled.div`
  height: 35rem;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: #282a36;
  color: #fff;
  border-radius: 10px;

  button {
    width: 300px;
  }
  .cancel {
    background: none;
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    svg {
      margin-left: 10px;
    }
    &:hover {
      color: ${shade(0.5, '#fff')};
    }
  }
`;
