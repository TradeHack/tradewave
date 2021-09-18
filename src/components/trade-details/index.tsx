import React from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;


const StyledFormControl = styled(FormControl)`
  display: flex;
  margin-bottom: 8px;
  min-width: 200px;
  color: chartreuse;
`;

const StyledTextField = styled(TextField)`
margin-top: 12px;
margin-bottom: 12px;`

export default function TradeDetails() {
  return (
    <div>
      {/* Wrapper to center file */}
      <StyledPaper elevation={3}>
        {/*  Trade partner */}
        <StyledFormControl fullWidth>
          <StyledTextField label="Order number" variant="outlined" />
        </StyledFormControl>

        {/* Amount */}
        <StyledFormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            // value={values.amount}
            // onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
          />
        </StyledFormControl>

        {/* Order reference */}
      </StyledPaper>

      {/* Full form with all fields */}
    </div>
  );
}
