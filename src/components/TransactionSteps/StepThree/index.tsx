import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

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
        <Formik
          initialValues={{
            freight: '',
            origin: '',
            destination: '',
            incoterms: '',
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubmit={() => {}}
        >
          <Form>
            <InputContainer>
              <DropDown
                name='freight'
                label='Frieght Fowarder'
                items={[]}
                required
              />
              <DropDown
                name='origin'
                label='Origin Country'
                items={[]}
                required
              />
              <DropDown
                name='destination'
                label='Destination Country'
                items={[]}
                required
              />
              <DropDown
                name='incoterms'
                label='INCOTERMS 2020'
                items={[]}
                required
              />
            </InputContainer>
          </Form>
        </Formik>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepThree;
