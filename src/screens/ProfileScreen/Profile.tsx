import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import s from './Profile.sass';
import ChangePasswordForm from 'src/components/Forms/ChangePasswordForm/ChangePasswordForm';
import ChangeProfileForm from 'src/components/Forms/ChangeProfileForm/ChangeProfileForm';

export const Profile: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`ProfileScreenTitle`} className={s.root}>
      <ChangeProfileForm />
      <ChangePasswordForm />
    </Page>
  );
};

export default Profile;
