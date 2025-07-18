import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Dates = ({ name, label, control, rules = {}, defaultValue = null }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={field.value}
            onChange={(date) => field.onChange(date)}
            slotProps={{
              textField: {
                variant: 'standard',
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default Dates;
