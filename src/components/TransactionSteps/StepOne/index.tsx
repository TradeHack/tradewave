import React, { FC, useContext, useEffect, useState } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import DropDown from '@/components/common/Inputs/DropDown';
import styled from 'styled-components';
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from '@/components/common/Inputs/TextInput';
import { PaymentContext, IStepOne, Steps } from '@/context/paymentRequest';
import * as Yup from 'yup';
import { getCompanies } from '@/utils/getCompanies';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';

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

interface IProps {
  updateStep: (e: number) => void;
  next: number;
}

const StepOne: FC<IProps> = ({ updateStep, next }) => {
  const {
    setData,
    stepOne: { amount, refrence, buyer },
  } = useContext(PaymentContext);
  const { user } = useMoralis();

  const [buyers, setBuyers] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const results: any[] = await getCompanies(user as Moralis.User);
        const dropDownItems = results.map((company) => ({
          label: company.attributes.companyName,
          value: company,
        }));
        setBuyers(dropDownItems);
      })();
    }
  }, [user]);

  return (
    <StyledContainer>
      <Formik
        initialValues={
          {
            amount: amount,
            refrence: refrence,
            buyer: buyer,
            partner: process.env.NEXT_PUBLIC_LOGISTICS_PARTNER_ADDRESS
          } as IStepOne
        }
        validationSchema={Yup.object().shape({
          amount: Yup.string().required('Required'),
          refrence: Yup.string().required('Required'),

        })}
        onSubmit={(
          values: IStepOne,
          { setSubmitting }: FormikHelpers<IStepOne>
        ) => {
          if (setData) setData(Steps.StepOne, values);
          setSubmitting(false);
          updateStep(next);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <TransactionCard
            isCancelable
            onNext={() => submitForm()}
            isDisabled={isSubmitting}
          >
            <InputContainer>
              <Form>
                <DropDown
                  name='buyer'
                  label='Trade Partner'
                  items={buyers}
                  required
                />
                <TextInput name='amount' isRequired label='Amount' />
                <TextInput
                  name='refrence'
                  isRequired
                  label='Your Order Reference'
                />
              </Form>
            </InputContainer>
          </TransactionCard>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default StepOne;
