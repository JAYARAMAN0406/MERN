import React from 'react';
import { Button } from '@mui/material';

const Buttons = ({
  label,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default Buttons;
