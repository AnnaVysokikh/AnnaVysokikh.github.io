import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import profileSlice from './profileSlice';

export const store = configureStore({
  reducer: {
    profileSlice,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
