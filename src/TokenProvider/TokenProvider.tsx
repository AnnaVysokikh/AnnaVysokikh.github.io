import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reduxToolkit/store';

type TokenContextType = [string, boolean, Dispatch<SetStateAction<string>>];

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('accessToken') || '');

  const isAdmin = useSelector<RootState, boolean>((state) => state.profileSlice.isAdmin);

  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  const tokenContextValue: TokenContextType = [token, isAdmin, updateToken];

  return <TokenContext.Provider value={tokenContextValue}>{children}</TokenContext.Provider>;
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};
