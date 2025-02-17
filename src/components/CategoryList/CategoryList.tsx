import React, { FC, useEffect } from 'react';
import s from './CategoryList.module.sass';
import { CategoryType, OperationType } from '../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchGetCategories } from '../../reduxToolkit/categoryThunk';
import Category from '../Category/Category';

export const CategoryList: FC = () => {
  type AppDispatch = ThunkDispatch<OperationType, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector<RootState, CategoryType[]>((state) => state.categorySlice.categories);
  const allUploaded = useSelector<RootState, boolean>((state) => state.categorySlice.allUploaded);

  useEffect(() => {
    if (!allUploaded) {
      dispatch(fetchGetCategories());
    }
  }, []);
  const categoryList = categories.map((item) => {
    return (
      <div className={s.definition_product_list__div} key={item.id} id={item.id}>
        <Category category={item} />
      </div>
    );
  });
  return <div className={s.definition_product_list}>{categoryList}</div>
};
