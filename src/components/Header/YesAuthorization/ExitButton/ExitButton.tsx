import React from 'react'
import {useNavigate} from 'react-router-dom'
import s from "./ExitButton.module.sass"
import { signOut } from '../../../../reduxToolkit/profileSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'clsx';

export const getClassName: NavLinkProps['className'] = ({ isActive }) => cn(s.link, isActive && s.active);

const ExitButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function handleClick() {
    navigate("/signOut");
    dispatch(signOut());
  }

  const { t } = useTranslation();
  return (
    <NavLink className={getClassName} onClick={handleClick} to="/signin">
      {t`Exit`}
    </NavLink>
  )
}

export default ExitButton