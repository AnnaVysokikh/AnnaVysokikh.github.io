import React from 'react';
import s from './Layout.module.sass';
import Header from '../Header/Header';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxToolkit/store';
import { Message } from '../../reduxToolkit/app.types';
import MessageForm from '../../components/Forms/MessageForm/MessageForm';
import { clearMessageErrors } from '../../reduxToolkit/messageSlice';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const showMessage = useSelector<RootState, boolean>((state) => state.messageSlice.showMessage);
  const message = useSelector<RootState, Message>((state) => state.messageSlice.message);
  const dispatch = useDispatch();
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.content}>{children}</div>

      {showMessage &&
        createPortal(
            <MessageForm
              text={message.text}
              caption={message.caption}
              errors={message.errors}
              onClickEvent={() => dispatch(clearMessageErrors())}
              messageType={message.messageType}
            />,
          document.body
        )}
    </div>
  );
};

export default Layout;
