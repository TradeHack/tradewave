import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 20px;
`;

const StyledContainer = styled.div`
  margin-top: 60px;
`;
interface StepProps {
  updateStep: (e: number) => void;
  next: number;
  back: number;
}
const StepThree: FC<StepProps> = ({ updateStep, next, back }) => {
  return (
    <StyledContainer>
      <TransactionCard
        onBack={() => updateStep(back)}
        onNext={() => updateStep(next)}
      >
        <InputContainer>
          <DropDown label='Frieght Fowarder' />
          <DropDown label='Origin Country' />
          <DropDown label='Destination Country' />
          <DropDown label='INCOTERMS 2020' />
        </InputContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepThree;
