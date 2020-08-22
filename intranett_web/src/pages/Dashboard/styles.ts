import styled, { css } from 'styled-components';

interface FormProps {
  formIsVisible: number;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const ButtonContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const ButtonDashboard = styled.div`
  background: #333333;
  border-radius: 5px;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-decoration: none;
    background: none;
    outline: 0;
    border: none;
    h1 {
      font-size: 36px;
      margin-right: 10px;
    }

    @media (max-width: 967px) {
      flex-direction: column;
    }
  }
`;

export const TableContainer = styled.section<FormProps>`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #fff;
      font-weight: bold;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
    tbody {
      tr {
        cursor: pointer;
      }
      td {
        padding: 20px 32px;
        border: 0;
        background: #333333;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        ${props =>
          !props.formIsVisible &&
          css`
            position: relative;
          `}

        &.Finalizada {
          color: #12a454;
        }
        &.Cancelada {
          color: #e83f5b;
        }

        button {
          color: #e83f5b;
          position: absolute;
          bottom: 25%;
          transition: transform 0.2s;
          background: inherit;
          border: none;

          &:hover {
            transform: scale(1.2);
          }
          &:last-child {
            color: #12a454;
            margin-left: 2rem;
          }
          ${props =>
            props.formIsVisible &&
            css`
              opacity: 0;
            `}
        }
      }

      td:first-child {
        border-radius: 8px 0 0 8px;
      }

      td#last {
        border-radius: 0 8px 8px 0;
      }
    }
  }
`;
