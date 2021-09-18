import React from 'react';
import { Typography } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import { StyledPaper, StyledCenteredDiv } from './styles';
import StyledStepper from '../stepper';

export default function PaymentRequest() {
  return (
    <StylesProvider injectFirst>
      <StyledCenteredDiv>
        <StyledPaper>
          <Typography variant="h6" align="center">
            Request a payment
          </Typography>

          <StyledStepper />
        </StyledPaper>
      </StyledCenteredDiv>
    </StylesProvider>
  );
}
