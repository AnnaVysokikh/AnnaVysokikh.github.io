import React, { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from './AddCategoryForm.module.sass';

import { useTranslation } from 'react-i18next';
import { CategoryType, NewCategory, OperationType } from '../../../reduxToolkit/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../reduxToolkit/store';
import { Modal } from '../../../components/modal/modal';
import { setOpenAddCategory } from '../../../reduxToolkit/categorySlice';
import { fetchAddCategoryWithImage, fetchChangeCategoryWithImage } from '../../../reduxToolkit/categoryThunk';
// eslint-disable-next-line import/named
import { ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/named
import { AnyAction } from '@reduxjs/toolkit';
import { VerificationInput } from '../../VerificationInput/VerificationInput';

// eslint-disable-next-line react/prop-types
export const AddCategoryForm: FC = () => {
  type AppDispatch = ThunkDispatch<OperationType, any, AnyAction>;
  const category = useSelector<RootState, CategoryType>((state) => state.categorySlice.editCategory);

  const dispatch: AppDispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: category ? category.name : undefined,
    },
  });

  interface FormValues {
    name: string;
  }
  const addCategory: SubmitHandler<FormValues> = (value): void => {
    if (category) {
      const newCategory: NewCategory = {
        id: category.id,
        categoryName: value.name,
        file: file,
        url: url,
      };
      dispatch(fetchChangeCategoryWithImage(newCategory));
    } else {
      const newCategory: NewCategory = {
        categoryName: value.name,
        file: file,
        url: url,
      };
      dispatch(fetchAddCategoryWithImage(newCategory));
    }
    dispatch(setOpenAddCategory(false));

  };
  const { t } = useTranslation();

  const handleCloseModal = () => {
    dispatch(setOpenAddCategory(false));
  };
  const [selectFile, setSelectFile] = useState(category !== null && category.photo !== null);
  const [file, setFile] = useState(undefined);
  const [url, setUrl] = useState(category !== null ? category.photo : undefined);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectFile(true);
    setFile(e.target.files[0]);
  };

  const onClickDeleteFile = (): void => {
    setFile(undefined);
    setSelectFile(false);
    setUrl(undefined);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(addCategory)}>
        <Controller
          control={control}
          name="name"
          rules={{ required: t`is_requred` }}
          render={({ field }) => (
            <VerificationInput
              onChange={(date) => {
                field.onChange(date.target.value);
              }}
              inputValue={category?.name}
              title={t`AddCategoryForm.name`}
              placeholder={t`AddCategoryForm.name`}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <div className={s.block}>
          {!selectFile && (
            <>
              <label className={s.text_field__label}>{t('AddCategoryForm.addImages')}</label>

              <label className={s.input_file}>
                <input type="file" accept="image/png, image/jpeg" id="categoryPhoto" onChange={onChangeFile} />
                <span>{t('AddCategoryForm.selectFile')}</span>
              </label>
            </>
          )}
          {selectFile && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              {url && <img src={url} width="70px"></img>}
              {file && <img src={URL.createObjectURL(file)} width="70px" />}
              <button className={s.buttonDelete} onClick={() => onClickDeleteFile()} >X</button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignContent: 'center', marginTop: '10px' }}>
        <button type='submit'>
          {category ? t('AddCategoryForm.change') : t('AddCategoryForm.add')}
        </button>
        <button onClick={handleCloseModal}>
          {t('AddCategoryForm.cancel')}
        </button>
        </div>
      </form>
    </Modal>
  );
};
