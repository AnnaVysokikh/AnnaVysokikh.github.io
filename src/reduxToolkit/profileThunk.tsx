import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResult, ChangePasswordBody, ChangePasswordResult, Profile, ServerErrors, SignInBody, SignUpBody, ThunkApi, UpdateProfileBody } from "./app.types";
import { setProfile } from "./profileSlice";
import { setMessageErrors } from "./messageSlice";

export const fetchSignIn = createAsyncThunk<AuthResult, SignInBody, { rejectValue: ThunkApi }>(
    'fetchSignIn',
    async (data, { rejectWithValue, dispatch }) => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        };
        fetch('http://19429ba06ff2.vps.myjino.ru/api/signin', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const result: AuthResult = (await response.json()) as AuthResult;
            var token = result.token
            localStorage.setItem('accessToken', token);
            dispatch(fetchGetProfile())
          }
          if (!response.ok) {
            console.log(response)
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка при авторизации',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка при авторизации',
              errors: error,
              messageType: 'Error',
            })
          );
        });
      } catch (error) {
        return error.message;
      }
    }
  )
  
export const fetchSignUp = createAsyncThunk<AuthResult, SignUpBody, { rejectValue: ThunkApi }>(
  'fetchSignUp',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/signup', requestOptions)
      .then(async (response) => {
        if (response.ok) {
          const result: AuthResult = (await response.json()) as AuthResult;
          var token = result.token
          localStorage.setItem('accessToken', token);
          dispatch(fetchGetProfile())
        }
        // check for error response
        if (!response.ok) {
          console.log(response)
          const error: ServerErrors = (await response.json()) as ServerErrors;
          dispatch(
            setMessageErrors({
              caption: 'Ошибка при регистриции',
              errors: error,
              messageType: 'Error',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setMessageErrors({
            caption: 'Ошибка при регистриции',
            errors: error,
            messageType: 'Error',
          })
        );
      });
    } catch (error) {
      return error.message;
    }
  }
)

export const fetchGetProfile = createAsyncThunk<Profile, void, { rejectValue: ThunkApi }>(
  'fetchGetProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile', requestOptions)
      .then(async (response) => {
        if (response.ok) {
          const result: Profile = (await response.json()) as Profile;
          var email = result.email
          var name = result.name
          dispatch(setProfile({ email, name }))
        }
        // check for error response
        if (!response.ok) {
          console.log(response)
          const error: ServerErrors = (await response.json()) as ServerErrors;
          dispatch(
            setMessageErrors({
              caption: 'Ошибка получения профиля',
              errors: error,
              messageType: 'Error',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setMessageErrors({
            caption: 'Ошибка получения профиля',
            errors: error,
            messageType: 'Error',
          })
        );
      });
    } catch (error) {
      return error.message;
    }
  }
)

export const fetchProfileChange = createAsyncThunk<Profile, UpdateProfileBody, { rejectValue: ThunkApi }>(
  'fetchProfileChange',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile', requestOptions)
      .then(async (response) => {
        if (response.ok) {
          const result: Profile = (await response.json()) as Profile;
          var email = result.email
          var name = result.name
          dispatch(setProfile({ email, name }))
        }
        // check for error response
        if (!response.ok) {
          console.log(response)
          const error: ServerErrors = (await response.json()) as ServerErrors;
          dispatch(
            setMessageErrors({
              caption: 'Ошибка изменения профиля',
              errors: error,
              messageType: 'Error',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setMessageErrors({
            caption: 'Ошибка изменения профиля',
            errors: error,
            messageType: 'Error',
          })
        );
      });
    } catch (error) {
      return error.message;
    }
  }
)

export const fetchPasswordChange = createAsyncThunk<ChangePasswordResult , ChangePasswordBody , { rejectValue: ThunkApi }>(
  'fetchPasswordChange',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/profile/change-password', requestOptions)
      .then(async (response) => {
        if (response.ok) {
          console.log("Пароль изменен")
        }
        // check for error response
        if (!response.ok) {
          console.log(response)
          const error: ServerErrors = (await response.json()) as ServerErrors;
          dispatch(
            setMessageErrors({
              caption: 'Ошибка изменения пароля',
              errors: error,
              messageType: 'Error',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setMessageErrors({
            caption: 'Ошибка изменения пароля',
            errors: error,
            messageType: 'Error',
          })
        );
      });
    } catch (error) {
      return error.message;
    }
  }
)