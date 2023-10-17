import React, { FC } from 'react';
import { Page } from '../../components/Page';
import s from './CategoryListScreen.module.sass';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { setOpenAddCategory } from '../../reduxToolkit/categorySlice';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { AddCategoryForm } from 'src/components/Forms/addCategoryForm/AddCategoryForm';
import { Modal } from 'src/components/modal/modal';

export const CategoryListScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openMessage = useSelector<RootState, boolean>((state) => state.categorySlice.openAddCategory);
  const onClick = () => {
    dispatch(setOpenAddCategory(true));
  };
  return (
    <Page title={t`CategoryScreenTitle`} className={s.root}>
      <div style={{ display: 'block', marginRight: '50px', width: '40px', height: '40px'}}>
        <img src={require(`../../images/plus.svg`)} onClick={onClick} />
      </div>
      <div>
        <CategoryList />
      </div>
      {openMessage && createPortal(<Modal><AddCategoryForm /></Modal>, document.body)}
    </Page>
  );
};

export default CategoryListScreen;
