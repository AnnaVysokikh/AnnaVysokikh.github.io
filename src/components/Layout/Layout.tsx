import React from 'react';
import s from './Layout.module.sass';
import Header from '../Header/Header';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default Layout;
