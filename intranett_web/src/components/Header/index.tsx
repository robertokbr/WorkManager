import React from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <header>
        <nav>
          <button type="button" onClick={signOut}>
            <FiArrowLeft />
            Logout
          </button>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
