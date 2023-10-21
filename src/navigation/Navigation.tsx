import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileScreen from 'src/screens/ProfileScreen/Profile';
import HomeScreen from 'src/screens/HomeScreen/Home';
import NotFound from 'src/screens/NotFound';
import RegistrationScreen from 'src/screens/RegistrationScreen';
import AuthorizationScreen from 'src/screens/AuthorizationScreen';
import { TokenProvider } from 'src/TokenProvider';
import { ProtectedRoute } from './ProtectedRoute';
import OperationListScreen from 'src/screens/OperationListScreen';
import CategoryListScreen from 'src/screens/CategoryListScreen';

export const Navigation: React.FC = () => (
  <TokenProvider>
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/operationList"
        element={
          <ProtectedRoute>
            <OperationListScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categoryList"
        element={
          <ProtectedRoute>
            <CategoryListScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<AuthorizationScreen />} />
      <Route path="/signup" element={<RegistrationScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TokenProvider>
);
