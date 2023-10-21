import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import profileSlice from './profileSlice';
import operationSlice from './operationSlice';
import categorySlice from './categorySlice';
import filterSlice from './filterSlice';
import messageSlice from './messageSlice';

export const store = configureStore({
  reducer: {
    profileSlice,
    operationSlice,
    categorySlice,
    filterSlice,
    messageSlice,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
