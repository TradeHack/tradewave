import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import RadioButtons from '@/components/common/Inputs/RadioInputs';
import Radio from '@/components/common/Inputs/RadioInputs/RadioButton';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const StyledTitle = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 42px;
    text-align: center;
    max-height: 60px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInputContainer = styled.div`
  padding-top: 25px;
`;

enum Options {
  Request,
  Make,
}

interface StepProps {
  updateStep: (e: number) => void;
  next: number;
}
const StepOne: FC<StepProps> = ({ updateStep, next }) => {
  const renderRadioButtons = () => (
    <>
      <Radio value={Options.Request.toString()} label='Request a payment' />
      <Radio value={Options.Make.toString()} label='Make a payment' />
    </>
  );
  return (
    <StyledContainer>
      <StyledTitle>Create a Transaction</StyledTitle>
      <TransactionCard
        isCancelable
        // eslint-disable-next-line no-console
        onBack={() => console.log('back')}
        onNext={() => updateStep(next)}
      >
        <StyledInputContainer>
          <RadioButtons
            title='What would you like to do?'
            radioButtons={renderRadioButtons()}
            initialValue={Options.Request.toString()}
          />
        </StyledInputContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepOne;
