import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import profileSlice from './profileSlice';
import operationSlice from './operationSlice';
import categorySlice from './categorySlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    profileSlice,
    operationSlice,
    categorySlice,
    filterSlice,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
