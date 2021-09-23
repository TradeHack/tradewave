import React, { FC } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

interface DropDownProps {
  label: string;
}

const DropDown: FC<DropDownProps> = ({ label }) => {
  const handleChange = () => {};

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value=''
          label=''
          onChange={handleChange}
        >
          <MenuItem value={10}>test one</MenuItem>
          <MenuItem value={30}>test two</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
