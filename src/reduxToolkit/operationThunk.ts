import { createAsyncThunk } from '@reduxjs/toolkit';
import { ServerErrors, Filters, OperationType, NewOperation, OperationList } from './app.types';
import {
  addOperation,
  addOperations,
  deleteOperation,
  setUploadPage,
  updateOperation,
} from '../reduxToolkit/operationSlice';

import { setMessageErrors } from '../reduxToolkit/messageSlice';

interface MyKnownError {
  errorMessage: string;
  // ...
}

export const fetchDeleteOperation = createAsyncThunk<void, string, { rejectValue: MyKnownError }>(
  'operationSlice/fetchDeleteOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations/' + params, requestOptions)
        .then(async (response) => {
          // check for error response
          if (response.ok) {
            dispatch(deleteOperation(params));
          }
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка удаления операции',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка удаления операции',
              text: error.message,
              messageType: 'Error',
            })
          );
        });
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка удаления операции',
          text: error.message,
          messageType: 'Error',
        })
      );
    }
  }
);

export const fetchGetOperation = createAsyncThunk<void, Filters, { rejectValue: MyKnownError }>(
  'operationSlice/fetchGetOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
      };
      console.log(JSON.stringify(params));

      fetch(
        'http://19429ba06ff2.vps.myjino.ru/api/operations?' +
          new URLSearchParams({
            pagination: JSON.stringify(params.pagination),
            sorting: JSON.stringify(params.sorting),
            type: JSON.stringify(params.type),
            date: JSON.stringify(params.date),
          }).toString(),
        requestOptions
      )
        .then(async (response) => {
          if (response.ok) {
            const operations = (await response.json()) as OperationList;

            dispatch(
              setUploadPage({
                uploadPage: params.pagination.pageNumber,
                allUploaded: operations.data.length < params.pagination.pageSize,
              })
            );
            dispatch(addOperations(operations.data));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка получения операций',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setMessageErrors({
              caption: 'Ошибка получения операций',
              text: error.message,
              messageType: 'Error',
            })
          );
        });
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка получения операций',
          text: error.message,
          messageType: 'Error',
        })
      );
    }
  }
);

export const fetchAddOperation = createAsyncThunk<void, NewOperation, { rejectValue: MyKnownError }>(
  'operationSlice/fetchAddOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations', requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const operation: OperationType = (await response.json()) as OperationType;

            dispatch(addOperation(operation));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка добавления операции',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка добавления операции',
              text: error.message,
              messageType: 'Error',
            })
          );
        });
    } catch (error) {
      dispatch(
        setMessageErrors({
          caption: 'Ошибка добавления операции',
          text: error.message,
          messageType: 'Error',
        })
      );
    }
  }
);

export const fetchUpdateOperation = createAsyncThunk<void, NewOperation, { rejectValue: MyKnownError }>(
  'operationSlice/fetchUpdateOperation',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const newOperation: NewOperation = {
        name: params.name,
        desc: params.desc,
        date: params.date,
        amount: params.amount,
        type: params.type,
        categoryId: params.categoryId,
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        body: JSON.stringify(params),
      };
      fetch('http://19429ba06ff2.vps.myjino.ru/api/operations/' + params.id, requestOptions)
        .then(async (response) => {
          if (response.ok) {
            const operation: OperationType = (await response.json()) as OperationType;

            dispatch(updateOperation(operation));
          }
          // check for error response
          if (!response.ok) {
            const error: ServerErrors = (await response.json()) as ServerErrors;
            dispatch(
              setMessageErrors({
                caption: 'Ошибка обновления операции',
                errors: error,
                messageType: 'Error',
              })
            );
          }
        })
        .catch((error) => {
          dispatch(
            setMessageErrors({
              caption: 'Ошибка добавления операции',
              text: error.message,
              messageType: 'Error',
            })
          );
        });

      return '';
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
);