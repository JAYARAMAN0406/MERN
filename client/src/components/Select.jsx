import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from '@mui/material';

const Selects = ({
  name,
  label,
  control,
  rules = {},
  defaultValue = '',
  options = [],
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}  variant="standard">
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
              labelId={`${name}-label`}
               variant="standard"
              id={`${name}-select`}
              value={field.value}
              label={label}
              onChange={field.onChange}
            >
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default Selects;
