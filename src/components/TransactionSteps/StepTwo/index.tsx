import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import TextInput from '@/components/common/Inputs/TextInput';

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
          <Formik
            initialValues={{
              amount: '',
              refrence: '',
              partner: '',
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onSubmit={() => {}}
          >
            <Form>
              <DropDown
                name='partner'
                label='Trade Partner'
                items={[]}
                required
              />
              <TextInput name='amount' isRequired label='Amount' />
              <TextInput
                name='refrence'
                isRequired
                label='Your Order Refrence'
              />
            </Form>
          </Formik>
        </InputContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepTwo;
