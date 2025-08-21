import React from 'react';
import { TextField } from '@mui/material';

const GreyTextField = ({ value, onChange, placeholder = '', width = 100, ...props }) => {
  return (
    <TextField
      variant="filled"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      fullWidth={false}
      InputProps={{
        disableUnderline: true,
        sx: {
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          height: 36,
          fontSize: '16px',
          paddingX: 1,
          width: width,
        },
      }}
      inputProps={{
        style: {
          padding: '6px 8px',
          textAlign: 'center',
          fontSize: '16px',
        },
      }}
      {...props}
    />
  );
};

export default GreyTextField;
