import React, { FC } from 'react';

import './modal.css';
interface ModalProps {
  children: React.ReactNode;
}
export const Modal: FC<ModalProps> = ({ children }) => {

  return (
    <div className="modal modal-outside modal-visible">
      <div className="modal-content">
        <div className="modal-button-close" />
        <div className="modal-inner-content">{children}</div>
      </div>
    </div>
  );
};
