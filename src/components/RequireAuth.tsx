import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';

type Props = { children: React.ReactNode };

const RequireAuth: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <LoginPage />;
  return <>{children}</>;
};

export default RequireAuth;