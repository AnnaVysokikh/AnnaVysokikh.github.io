import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import s from './AddOperationForm.module.sass';
import { useTranslation } from 'react-i18next';
import { CategoryType, NewOperation, OperationType } from '../../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/store';
import { setOpenAddOperation } from '../../../reduxToolkit/operationSlice';
import { Modal } from '../../../components/modal/modal';
import { CategorySelect } from '../../../components/CategorySelect';
import { Select } from 'antd';
import { fetchGetCategories } from '../../../reduxToolkit/categoryThunk';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchAddOperation, fetchUpdateOperation } from '../../../reduxToolkit/operationThunk';
import { DatePickerBox } from '../../DatePickerBox/DatePickerBox';

const { Option } = Select;

export const AddOperationForm: FC = () => {
  const allCategoryUploaded = useSelector<RootState, boolean>((state) => state.categorySlice.allUploaded);
  type AppDispatch = ThunkDispatch<OperationType, any, AnyAction>;

  const operation = useSelector<RootState, OperationType>((state) => state.operationSlice.editOperation);
  const defaultDate: Date = operation && operation.date ? new Date(Date.parse(operation.date)) : new Date();

  const [categoryId, setCategoryId] = useState(operation ? operation.category.id : undefined);
  const [type, setType] = useState(operation ? operation.type : undefined);
  const [typeUndefined, setTypeUndefined] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!allCategoryUploaded) {
      dispatch(fetchGetCategories());
    }
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      desc: operation ? operation.desc : undefined,
      name: operation ? operation.name : undefined,
      amount: operation ? operation.amount : undefined,
      date: defaultDate,
    },
  });

  interface FormValues {
    name: string;
    desc?: string;
    amount: number;
    date: Date;
  }
  const addOperation: SubmitHandler<FormValues> = (value): void => {
    if (!categoryId) {
      return;
    }
    if (!type) {
      setTypeUndefined(true);
      return;
    }
    if (operation) {
      console.log(value.date);
      const newOperation: NewOperation = {
        id: operation.id,
        name: value.name,
        desc: value.desc,
        date: value.date ? value.date.toISOString() : defaultDate.toISOString(),
        amount: value.amount,
        type: type,
        categoryId: categoryId,
      };

      dispatch(fetchUpdateOperation(newOperation));
    } else {
      console.log(value.date);
      const newOperation: NewOperation = {
        name: value.name,
        desc: value.desc,
        date: value.date.toISOString(),
        amount: value.amount,
        type: type,
        categoryId: categoryId,
      };

      dispatch(fetchAddOperation(newOperation));
    }
    dispatch(setOpenAddOperation(false));
    console.log(value.date);
  };
  const { t } = useTranslation();

  const handleCloseModal = () => {
    dispatch(setOpenAddOperation(false));
  };
  const [isOpen, setIsOpen] = useState(true);
  const categories = useSelector<RootState, CategoryType[]>((state) => state.categorySlice.categories);

  const onClickProf = () => {
    setTypeUndefined(false);
    return setType('Profit');
  };
  const onClickCost = () => {
    setTypeUndefined(false);
    return setType('Cost');
  };
  return (
    <Modal>
      <div className={s.title}>
        {operation ? t('AddOperationForm.titleEdit') : t('AddOperationForm.title')}
      </div>
      <button className={s.button} disabled={type === 'Profit'} onClick={onClickProf} >{t('AddOperationForm.Profit')}</button>
      <button className={s.button} disabled={type === 'Cost'} onClick={onClickCost} >{t('AddOperationForm.Cost')}</button>

      {typeUndefined && <label className={s.error_label}>{t('AddOperationForm.error_no_select_type')}</label>}
      <form onSubmit={handleSubmit(addOperation)}>
        <div className={s.text_field}>
          <label className={s.text_field__label}>{t('AddOperationForm.category')}</label>
          <CategorySelect
            items={categories}
            onChange={(value) => setCategoryId(value)}
            selectCategory={operation ? operation.category : null}
          />
          <label className={s.text_field__label}>{t('AddOperationForm.operationName')}</label>
          <input
            className={s.text_field__input}
            type="text"
            placeholder={t('AddOperationForm.operationName')}
            {...register('name', {
              required: t('is_required'),
            })}
          />
          <label className={s.text_field__error_label}>{errors.name?.message}</label>
          <label className={s.text_field__label}>{t('AddOperationForm.description')}</label>
          <input
            className={s.text_field__input}
            type="text"
            placeholder={t('AddOperationForm.description')}
            {...register('desc')}
          />
          <label className={s.text_field__label}>{t('AddOperationForm.price')}</label>
          <input
            className={s.text_field__input}
            type="number"
            placeholder={t('AddOperationForm.price')}
            step="any"
            {...register('amount', {
              required: t('is_required'),
              min: {
                message: t('AddOperationForm.minAmount'),
                value: 0.01,
              },
            })}
          />
          <label className={s.text_field__error_label}>{errors.amount?.message}</label>
          <label className={s.text_field__label}>{t('AddOperationForm.date')}</label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePickerBox
                name="isinDate"
                onChange={(date) => field.onChange(date)}
                defaultDate={operation && operation.date ? new Date(Date.parse(operation.date)) : new Date()}
              />
            )}
          />
          <label className={s.text_field__error_label}>{errors.amount?.message}</label>
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <button className={s.button} type='submit'>
              {operation ? t('AddOperationForm.change') : t('AddOperationForm.add')}
            </button>
            <button className={s.button} onClick={handleCloseModal} >{t('AddOperationForm.cancel')}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
