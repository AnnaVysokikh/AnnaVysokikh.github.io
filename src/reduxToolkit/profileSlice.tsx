import { createSlice } from '@reduxjs/toolkit';

export interface StateProps {
  isSingIn: boolean;
  isAdmin: boolean;
  password: string;
  nikename: string;
  token: string
}

export interface LoginPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: StateProps = {
  isSingIn: false,
  isAdmin: false,
  password: '',
  nikename: '',
  token:'',
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfile: (state: StateProps, action: { payload: { email: string; name: string } }) => {
        const { email, name } = action.payload;
        state.isSingIn = true;
        if (email === 'admin@mail.ru') {  /// пароль adminadmin
            state.isAdmin = true;
        }
        else {
            state.isAdmin = false;
        }
        if (name != undefined)
          state.nikename = name
        else state.nikename = ""
    },
    signOut: (state: StateProps) => {
      localStorage.removeItem('accessToken');
      state.isSingIn = false;
      state.isAdmin = false;
      state.nikename = '';
      state.token = ''
    },
    auth: (state: StateProps, action: { payload: { email: string, token: string } }) => {
      const { email, token } = action.payload;
        localStorage.setItem('accessToken', token);
        state.token = token
      }
  },
});

export const { signOut, auth, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
