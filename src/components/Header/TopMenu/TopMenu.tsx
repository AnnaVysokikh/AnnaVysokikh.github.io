import React from 'react';
import s from './TopMenu.module.sass';
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reduxToolkit/store';

type TopMenuProps = {
  children?: React.ReactNode;
};

export const getClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.link, isActive && s.active);

const TopMenu = ({ children }: TopMenuProps) => {
  const { t } = useTranslation();
  const isSingIn = useSelector<RootState, boolean>((state) => state.profileSlice.isSingIn);
  return (
    <div className={s.menu}>
      {children}
      <NavLink className={getClassName} to="/">
        {t`HomeScreenTitle`}
      </NavLink>
      {isSingIn && (
      <NavLink className={getClassName} to="/operationList">
        {t`OperationScreenTitle`}
      </NavLink>
      )}
      {isSingIn && (
        <NavLink className={getClassName} to="/categoryList">
          {t`CategoryScreenTitle`}
        </NavLink>
      )}
      {isSingIn && (
        <NavLink className={getClassName} to="/profile">
          {t`ProfileScreenTitle`}
        </NavLink>
      )}
    </div>
  );
};

export default TopMenu;
