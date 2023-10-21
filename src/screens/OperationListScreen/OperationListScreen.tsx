import React, { FC } from 'react';
import { Page } from '../../components/Page';
import s from './OperationListScreen.module.sass';
import { useTranslation } from 'react-i18next';
import { OperationList } from '../../components/OperationList/OperationList';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { setOpenAddOperation } from '../../reduxToolkit/operationSlice';
import { FilterForm } from 'src/components/Forms/FilterForm/FilterForm';
import { AddOperationForm } from 'src/components/Forms/addOperationForm/AddOperationForm';
import { Modal } from 'src/components/modal/modal';

export const OperationListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openMessage = useSelector<RootState, boolean>((state) => state.operationSlice.openAddOperation);
  const isSingIn = useSelector<RootState, boolean>((state) => state.profileSlice.isSingIn);

  const onClick = () => {
    dispatch(setOpenAddOperation(true));
  };
  return (
    <Page title={t`OperationScreenTitle`} className={s.root}>
      <div className={s.form_box}>
        <FilterForm />
        <div style={{ flexGrow: 1 }}>
          <div className={s.add}>
            {isSingIn && <img src={require(`../../images/plus.svg`)} onClick={onClick} />}
          </div>
          <OperationList />
        </div>
      </div>
      {openMessage && createPortal(<Modal><AddOperationForm /></Modal>, document.body)}
    </Page>
  );
};

export default OperationListScreen;
