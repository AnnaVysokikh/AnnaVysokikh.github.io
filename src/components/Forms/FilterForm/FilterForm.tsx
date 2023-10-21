import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from './FilterForm.module.sass';
import { useDispatch } from 'react-redux';
import { Filters } from '../../../reduxToolkit/app.types';
import { DatePickerBox } from '../../DatePickerBox/DatePickerBox';
import { Select } from 'antd';
import { setFilter } from 'src/reduxToolkit/filterSlice';
import { clearOperations } from 'src/reduxToolkit/operationSlice';
import { useTranslation } from 'react-i18next';

export const FilterForm: FC = () => {
  const defaultDate: Date = new Date();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      startDate: defaultDate,
      endDate: defaultDate,
      checkStartDate: false,
      checkEndDate: false,
      operationType: 'Все операции',
    },
  });
  interface FormValues {
    operationType?: string;
    startDate?: Date;
    endDate?: Date;
    checkStartDate: boolean;
    checkEndDate: boolean;
  }

  const dispatch = useDispatch();
  const clickSubmit: SubmitHandler<FormValues> = async (value) => {
    console.log(value);
    const filter: Filters = {
      pagination: {
        pageSize: 10,
        pageNumber: 1,
      },
      sorting: {
        type: 'ASC',
        field: 'createdAt',
      },
      type: value.operationType === 'Приход' ? 'Profit' : value.operationType === 'Расход' ? 'Cost' : null,
      date: {
        gte: value.checkStartDate ? value.startDate.toISOString() : null,
        lte: value.checkEndDate ? value.endDate.toISOString() : null,
      },
    };
    dispatch(clearOperations());
    dispatch(setFilter(filter));
  };

  const selectedStartDate = watch('checkStartDate');
  const selectedEndDate = watch('checkEndDate');
  const { t } = useTranslation();
  return (
      <form onSubmit={handleSubmit(clickSubmit)}>
        <div className={s.filter_form}>
          <label className={s.label}>{t`FilterForm.operationType`}</label>
          <Controller
            control={control}
            name="operationType"
            render={({ field }) => (
              <Select
                onChange={(date) => field.onChange(date)}
                defaultValue="Все операции"
                className={s.select}
              >
                <Select.Option key={1} value="Все операции">
                  Все операции
                </Select.Option>
                <Select.Option key={2} value="Приход">
                  Приход
                </Select.Option>
                <Select.Option key={3} value="Расход">
                  Расход
                </Select.Option>
              </Select>
            )}
          />
          <Controller
            control={control}
            name="checkStartDate"
            render={({ field }) => (
              <>
                <input type="checkbox" id="startDate" name="startDate" onChange={(event) => field.onChange(event)} />
                <label htmlFor="startDate">{t`FilterForm.dateFrom`}</label>
              </>
            )}
          />
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePickerBox
                name="startDate"
                onChange={(date) => field.onChange(date)}
                defaultDate={new Date()}
                disabled={!selectedStartDate}
              />
            )}
          />
          <Controller
            control={control}
            name="checkEndDate"
            render={({ field }) => (
              <>
                <input type="checkbox" id="endDate" name="endDate" onChange={(event) => field.onChange(event)} />
                <label htmlFor="endDate">{t`FilterForm.dateTo`}</label>
              </>
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePickerBox
                name="endDate"
                onChange={(date) => field.onChange(date)}
                defaultDate={new Date()}
                disabled={!selectedEndDate}
              />
            )}
          />
          <button type='submit' className={s.button_send} >{t`FilterForm.apply`}</button>
        </div>
      </form>
  );
};
