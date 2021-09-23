import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 30px;
`;

const StyledContainer = styled.div`
  margin-top: 60px;
`;

interface StepProps {
  updateStep: (e: number) => void;
  next: number;
  back: number;
}
const StepTwo: FC<StepProps> = ({ updateStep, next, back }) => {
  return (
    <StyledContainer>
      <TransactionCard
        onBack={() => updateStep(back)}
        onNext={() => updateStep(next)}
      >
        <InputContainer>
          <DropDown label='Trade Partner' />
          <TextField id='standard-basic' label='Amount' />
          <TextField id='standard-basic' label='Your Order Refrence' />
        </InputContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepTwo;
