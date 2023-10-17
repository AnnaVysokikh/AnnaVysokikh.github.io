import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OperationType } from '../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchDeleteOperation } from '../../reduxToolkit/operationThunk';
import { setEditOperation, setOpenAddOperation } from '../../reduxToolkit/operationSlice';
import { RootState } from '../../reduxToolkit/store';
import s from './Operation.module.sass';

interface CartItemProps {
  operation: OperationType;
}

const getDateDDMMYYYY = (date: Date) => {
    return (
      ('0' + (date.getDate() + 1)).slice(-2) +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      date.getFullYear() +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2));
};

const Operation: React.FC<CartItemProps> = ({ operation }) => {
  const isSingIn = useSelector<RootState, boolean>((state) => state.profileSlice.isSingIn);

  type AppDispatch = ThunkDispatch<string, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const onDelete = () => {
    dispatch(fetchDeleteOperation(operation.id));
  };
  const onEdit = () => {
    dispatch(setEditOperation(operation));
    dispatch(setOpenAddOperation(true));
  };
  const isoFormatDate = operation.date ? new Date(Date.parse(operation.date)) : null;

  const stringDate = isoFormatDate ? getDateDDMMYYYY(isoFormatDate) : null;
  return (
    <div className={s.container}>
      <img
        className={s.itemImage}
        src={operation.category?.photo || require(`../../images/coins.svg`)}
        title={operation.category?.name}
      />
      <div className={s.content}>
        <div className={s.header}>
          {operation.type === 'Cost' ? '-' : '+'} {operation.amount} р, {operation.name}
        </div>
        <div className={s.footer}>
          <div>
            {stringDate}
            <div className={s.description}>{operation.desc}</div>
          </div>
          {isSingIn && (
            <div>
              <img src={require(`../../images/edit.svg`)} onClick={onEdit} />
              <img src={require(`../../images/delete.svg`)} onClick={onDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Operation;