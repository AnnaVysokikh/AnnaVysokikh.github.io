import React, { FC } from 'react';
// eslint-disable-next-line import/no-unresolved
import '../../i18n';
import { useTranslation } from 'react-i18next';
import s from './LanguageButton.module.sass';
import { BasicButton } from '../basicButton/BasicButton';

export enum Locale {
  ru = 'ru',
  en = 'en',
}

// eslint-disable-next-line react/prop-types
// export const LanguageButton: FC = () => {
//   const { t, i18n } = useTranslation();
//   const lngStyle = (buttonLng: string): string => (buttonLng === i18n.language ? 'in-basket__disabled' : '');
//   const ruStyle = 'in-basket__left-button ' + lngStyle('ru');
//   const enStyle = 'in-basket__right-button ' + lngStyle('en');
//   return (
//     <div className={s.language_button}>
//       <BasicButton className={ruStyle} text={t('language.ru')} onClick={() => i18n.changeLanguage('ru')} />
//       <BasicButton className={enStyle} text={t('language.en')} onClick={() => i18n.changeLanguage('en')} />
//     </div>
//   );
// };

export const LanguageButton: FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language as Locale) === Locale.ru ? Locale.en : Locale.ru;
  return (
    <button type="button" className={s.root} onClick={() => i18n.changeLanguage(lang)}>
      {lang}
    </button>
  );
};
