import React, { FC, useContext } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import styled from 'styled-components';
import { Formik, Form, FormikHelpers } from 'formik';
import { PaymentContext, IStepTwo, Steps } from '@/context/paymentRequest';

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
interface IProps {
  updateStep: (e: number) => void;
  next: number;
  back: number;
}
const StepThree: FC<IProps> = ({ updateStep, next, back }) => {
  const {
    setData,
    stepTwo: { freight, origin, destination, incoterms },
  } = useContext(PaymentContext);
  return (
    <StyledContainer>
      <Formik
        initialValues={
          {
            freight: freight,
            origin: origin,
            destination: destination,
            incoterms: incoterms,
          } as IStepTwo
        }
        onSubmit={(
          values: IStepTwo,
          { setSubmitting }: FormikHelpers<IStepTwo>
        ) => {
          if (setData) setData(Steps.StepTwo, values);
          setSubmitting(false);
          updateStep(next);
        }}
      >
        {({ submitForm }) => (
          <TransactionCard
            onBack={() => updateStep(back)}
            onNext={() => updateStep(next)}
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
          </TransactionCard>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default StepThree;
