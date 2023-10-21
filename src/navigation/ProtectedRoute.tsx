import React, { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTokenContext } from 'src/TokenProvider';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const [token, isAdmin] = useTokenContext();
  const location = useLocation();
  if ((location.pathname === "/profile") && token) {
    return <>{children}</>;
  }
  if ((location.pathname === "/categoryList") && token) {
    return <>{children}</>;
  }
  if ((location.pathname === "/operationList") && token) {
    return <>{children}</>;
  }
  if (token && isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/signin" replace />;
  }
};
