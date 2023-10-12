import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './ChangePasswordForm.module.sass';
import { useTranslation } from 'react-i18next';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ChangePasswordBody } from 'src/reduxToolkit/app.types';
import { useDispatch } from 'react-redux';
import { fetchPasswordChange } from 'src/reduxToolkit/profileThunk';

interface ChangePasswordFormProps {
    oldPassword: string;
    password: string;
    repeatPassword: string;
};

const ChangePasswordForm = () => {
    const { t } = useTranslation();
    const er = t`is_required`
    const { 
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ChangePasswordFormProps>({mode: 'onBlur'});
    type AppDispatch = ThunkDispatch<ChangePasswordBody, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch();
    const onChangePassword: SubmitHandler<ChangePasswordFormProps> = (value): void => {
      var password = value.oldPassword
      var newPassword = value.password
      dispatch(fetchPasswordChange({ password, newPassword }))
      
      reset();
    }
    return (
      <form className={s.form} onSubmit={handleSubmit(onChangePassword)}>
        <div className={s.title}>{t`ProfileScreen.changePassword.title`}</div>
        <div className={s.field}>
          <label className={s.label}>{t`ChangePasswordForm.password.title`}</label>
          <input 
            className={s.input_pass}
            name="oldPassword"
            type="password"
            placeholder={t`ChangePasswordForm.password.placeholder`}
            {...register('oldPassword', { required: er})}
          />
          <label className={s.error_label}>{errors.oldPassword?.message}</label>
        </div>
        <div className={s.field}>
          <label className={s.label}>{t`ChangePasswordForm.newPassword.title`}</label>
          <input 
            className={s.input_pass}
            name="password"
            type="password"
            placeholder={t`ChangePasswordForm.newPassword.placeholder`}
            {...register('password', { required: er})}
          />
          <label className={s.error_label}>{errors.password?.message}</label>
        </div>
        <div className={s.field}>
          <label className={s.label}>{t`ChangePasswordForm.repeatPassword.title`}</label>
          <input 
            className={s.input_pass}
            name="passwordConfirmation"
            type="password"
            placeholder={t`ChangePasswordForm.repeatPassword.placeholder`}
            {...register('repeatPassword', { required: er})}
          />
          <label className={s.error_label}>{errors.repeatPassword?.message}</label>
        </div>
        <button className={s.button_send} type="submit">
        {t`ProfileScreen.changePassword.save`}
        </button>
      </form>
    )
}
export default ChangePasswordForm;