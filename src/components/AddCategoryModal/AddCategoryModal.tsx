import React, { FC } from 'react';
import { AddCategoryForm } from '../../components/Forms/addCategoryForm/AddCategoryForm';
import { Modal } from '../modal/modal';

export const AddCategoryModal: FC = () => {
  return (
      <Modal>
        <AddCategoryForm />
      </Modal>
  );
};
