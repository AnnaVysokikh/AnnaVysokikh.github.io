import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './ChangeProfileForm.module.sass';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/reduxToolkit/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { fetchProfileChange } from 'src/reduxToolkit/profileThunk';
import { UpdateProfileBody } from 'src/reduxToolkit/app.types';

interface ChangeProfileFormProps {
  name: string;
};

const ChangeProfileForm = () => {
    const { t } = useTranslation();
    const er = t`is_required`
    const { 
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangeProfileFormProps>({mode: 'onBlur'});

    type AppDispatch = ThunkDispatch<UpdateProfileBody, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch();

    const onChangePassword: SubmitHandler<ChangeProfileFormProps> = (value): void => {
      var name = value.name
      dispatch(fetchProfileChange({ name }));
    }
    const nikename = useSelector<RootState, string>(state =>state.profileSlice.nikename);
    return (
      <form className={s.form} onSubmit={handleSubmit(onChangePassword)}>
        <div className={s.title}>{t`ProfileScreen.updateProfile.title`}</div>
        <div className={s.field}>
          <label className={s.label}>{t`ProfileForm.name.title`}</label>
          <input
            defaultValue={nikename}
            className={s.input_pass}
            name="name"
            type="text"
            placeholder={t`ProfileForm.name.placeholder`}
            {...register('name', { required: er})}
          />
          <label className={s.error_label}>{errors.name?.message}</label>
        </div>
        <button className={s.button_send} type="submit">
          {t`ProfileScreen.updateProfile.save`}
        </button>
      </form>
    )
}
export default ChangeProfileForm;