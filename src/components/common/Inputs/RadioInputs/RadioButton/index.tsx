import React, { FC } from 'react';
import { Radio, FormControlLabel } from '@material-ui/core';

interface RadioInputsProps {
  value: any;
  label: any;
}

const RadioInput: FC<RadioInputsProps> = ({ label, value }) => {
  return <FormControlLabel value={value} control={<Radio />} label={label} />;
};

export default RadioInput;
