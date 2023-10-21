import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './LoginUserForm.module.sass';
import { useDispatch } from 'react-redux';
import { fetchSignIn, fetchSignUp } from 'src/reduxToolkit/profileThunk';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { SignInBody } from 'src/reduxToolkit/app.types';
import { useTranslation } from 'react-i18next';

interface LoginUserFormProps {
  registration: boolean;
}
export const LoginUserForm: FC<LoginUserFormProps> = ({ registration }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  type AppDispatch = ThunkDispatch<SignInBody, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
  }

  const clickSubmit: SubmitHandler<FormValues> = async (value) => {
    const { email, password } = value;
    if (!registration){
      dispatch(fetchSignIn({ email, password }))
    }
    else {
      dispatch(fetchSignUp({ email, password, commandId:"9bafdfdfdffggfgffgft7654469853b" }));
    }
    navigate('/');
    reset();
  };

  const pass = watch('password');
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(clickSubmit)}>
        <div className={s.field}>
          <label className={s.label}>Email*</label>
          <input
            className={s.input_pass}
            placeholder="email"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <label className={s.error_label}>{errors.email?.message}</label>
        </div>
        <div className={s.field}>
          <label className={s.label}>{t`RepeatPasswordForm.password.title`}*</label>
          <input
            className={s.input_pass}
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 10,
                message: 'Пароль должен содержать не менее 10 символов',
              },
              pattern: {
                value: /^\w+$/,
                message: 'Пароль должен содержать латинские буквы, цифры и знаки _',
              },
            })}
          />
          <label className={s.error_label}>{errors.password?.message}</label>
        </div>
          {registration && (
            <div className={s.field}>
              <label className={s.label}>{t`RepeatPasswordForm.repeatPassword.title`}*</label>
              <input
                className={s.input_pass}
                type="password"
                placeholder={t`RepeatPasswordForm.repeatPassword.placeholder`}
                {...register('confirmPassword', {
                  required: 'Поле обязательно для заполнения',
                  validate: (value) => value === pass || 'Пароли не совпадают',
                })}
              />

              <label className={s.error_label}>{errors.confirmPassword?.message}</label>
            </div>
          )}

          <button type="submit" className={s.button_send}>
            {registration ? t('Registration') : t('Authorization')}
          </button>
      </form>
    </>
  );
};
