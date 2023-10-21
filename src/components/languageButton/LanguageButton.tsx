import React, { FC } from 'react';
import '../../i18n';
import { useTranslation } from 'react-i18next';
import s from './LanguageButton.module.sass';

export enum Locale {
  ru = 'ru',
  en = 'en',
}

export const LanguageButton: FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language as Locale) === Locale.ru ? Locale.en : Locale.ru;
  return (
    <button type="button" className={s.root} onClick={() => i18n.changeLanguage(lang)}>
      {lang}
    </button>
  );
};
