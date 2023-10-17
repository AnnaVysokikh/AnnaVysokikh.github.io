import React from 'react';
import { useDispatch } from 'react-redux';
import { CategoryType } from '../../reduxToolkit/app.types';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { fetchDeleteCategory } from '../../reduxToolkit/categoryThunk';
import { setEditCategory, setOpenAddCategory } from '../../reduxToolkit/categorySlice';
import style from './Category.module.sass';

interface CategoryItemProps {
  category: CategoryType;
}

const Category: React.FC<CategoryItemProps> = ({ category }) => {
  type AppDispatch = ThunkDispatch<string, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const onDelete = () => {
    dispatch(fetchDeleteCategory(category.id));
  };
  const onEdit = () => {
    dispatch(setEditCategory(category));
    dispatch(setOpenAddCategory(true));
  };
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>{category.name}</div>
        <div className={style.footer}>
          <img src={category.photo} width="80px" />
          <div>
            <img src={require(`../../images/edit.svg`)} onClick={onEdit} />
            <img src={require(`../../images/delete.svg`)} onClick={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
