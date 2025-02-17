import { createSlice } from '@reduxjs/toolkit';
import { CategoryType } from '../reduxToolkit/app.types';

export interface StateProps {
  categories: CategoryType[];
  errors: string[];
  openAddCategory: boolean;
  allUploaded: boolean;
  editCategory: CategoryType;
}
const initialState: StateProps = {
  categories: [],
  errors: [],
  openAddCategory: false,
  allUploaded: false,
  editCategory: null,
};

const operationSlice = createSlice({
  name: 'operationSlice',
  initialState,
  reducers: {
    setCategories: (state = initialState, action) => {
      state.categories = action.payload;
      state.allUploaded = true;
    },
    deleteCategory: (state = initialState, action) => {
      const index = state.categories.findIndex((op) => op.id === action.payload);
      state.categories.splice(index, 1);
    },
    setOpenAddCategory: (state = initialState, action) => {
      state.openAddCategory = action.payload;
      if (!action.payload) {
        state.editCategory = null;
      }
    },
    setEditCategory: (state = initialState, action) => {
      state.editCategory = action.payload;
    },
    addCategory: (state = initialState, action) => {
      state.categories.push(action.payload);
    },
    changeCategory: (state = initialState, action) => {
      const index = state.categories.findIndex((op) => op.id === action.payload.id);
      state.categories[index] = action.payload;
    },
    clearCategories: (state = initialState) => {
      state.categories = [];
      state.allUploaded = false;

    },
  },
});

export const {
  setCategories,
  deleteCategory,
  setOpenAddCategory,
  addCategory,
  setEditCategory,
  changeCategory,
  clearCategories,
} = operationSlice.actions;
export default operationSlice.reducer;
