import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Window = styled.div`
  background-color: #fff;
  // width: 300px;
  // height: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  z-index: 2;
`;

const CloseButton = styled.button`
  margin-top: 16px;
  align-self: center;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  font-size: 14px;
  padding: 11px 20px;
`;

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  useEffect(() => {
    if (visible) {
      const modalRoot = document.getElementById('modal-root');
      if (!modalRoot) return;

      const modalElement = document.createElement('div');
      modalRoot.appendChild(modalElement);

      return () => {
        modalRoot.removeChild(modalElement);
      };
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <ModalContainer>
      <Mask />
      <Window>
        {children}
        <CloseButton onClick={handleClose}>Close</CloseButton>
      </Window>
    </ModalContainer>,
    document.getElementById('modal-root') || document.body
  );
};

export default Modal;
