import React, { FC, useState } from 'react';
import { AddOperationForm } from '../Forms/addOperationForm/AddOperationForm';
import { Modal } from '../modal/modal';

export type AddProductionScreenProps = {
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
};
export const AddProductionScreen: FC = () => {
  return (
    <Modal>
      <AddOperationForm />
    </Modal>
  );
};
