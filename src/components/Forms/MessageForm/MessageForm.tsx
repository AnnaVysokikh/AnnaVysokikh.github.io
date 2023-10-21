import React, { FC } from 'react';
import s from './MessageForm.module.sass';
import { ServerErrors } from '../../../reduxToolkit/app.types';
import { Modal } from '../../modal/modal';

export type MessageFormProps = {
  caption?: string;
  text?: string;
  messageType: 'Error' | 'Info';
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
  errors?: ServerErrors;
};

export const MessageForm: FC<MessageFormProps> = ({ caption, text, onClickEvent, errors, messageType}) => {
  const createContent = () => {
    const content = [];
    let j = 0;
    while (j < errors?.errors.length) {
      content.push(
        <div>
          <label key={j}>
            {errors.errors[j].extensions.code}: {errors.errors[j].message}
          </label>
        </div>
      );
      j = j + 1;
    }
    return content;
  };

  const content = createContent();
  return (
    <Modal>
      <div className={s.message_content}>
        {caption && <label className={s.message_caption}>{caption}</label>}
        <div className={s.message_text_context}>
          <div className={s.message_text}>
            {text && <label>{text}</label>}
            {errors && content}
          </div>
        </div>
        <div className={s.div_button}>
          <button onClick={onClickEvent}>OK</button>
        </div>
      </div>
    </Modal>
  );
};
export default MessageForm;
