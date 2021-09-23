import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 20px;
`;

const StyledContainer = styled.div`
  margin-top: 60px;
`;

const StyledTitle = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 42px;
    text-align: center;
    max-height: 60px;
  }
`;
interface StepProps {
  updateStep: (e: number) => void;
  next: number;
  back: number;
}
const StepFour: FC<StepProps> = ({ updateStep, next, back }) => {
  return (
    <StyledContainer>
      <TransactionCard
        onBack={() => updateStep(back)}
        onNext={() => updateStep(next)}
      >
        <StyledTitle>Summary</StyledTitle>
        <DataContainer>TODO: add data</DataContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepFour;
