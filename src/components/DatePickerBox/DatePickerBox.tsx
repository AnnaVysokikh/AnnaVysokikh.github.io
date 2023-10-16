import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';

// eslint-disable-next-line import/no-unresolved
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerBox.css';
import { useDispatch } from 'react-redux';

interface DatePickerBoxProps {
  name: string;
  onChange?: (date: Date) => void;
  clearState?: () => void;
  defaultDate: Date;
  disabled?: boolean;
}

export const DatePickerBox: FC<DatePickerBoxProps> = ({ name, onChange, defaultDate, disabled = false }) => {
    console.log(defaultDate)
  const [startDate, setStartDate] = useState(defaultDate);
  const [date, setDate] = useState(defaultDate);
  const updateDate = (value: Date) => {
    setDate(value);
  };
  return (
    <div className="datebox-container">
      <DatePicker
        dateFormat="dd.MM.yyyy HH:mm"
        wrapperClassName="datePicker100"
        calendarClassName="datepicker-calendar"
        showTimeSelect
        disabled={disabled}
        timeFormat="HH:mm"
        timeIntervals={15}
        selected={date}
        onChange={(date) => {
          setDate(date);
          onChange(date);
        }}
      />
    </div>
  );
};
