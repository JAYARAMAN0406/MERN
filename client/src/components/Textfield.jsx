
import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const TextFields = ({ name, label, control, rules = {}, defaultValue = "" }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="standard"
          fullWidth
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
};

export default TextFields;
