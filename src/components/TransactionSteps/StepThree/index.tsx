import React, { FC, useContext, useEffect, useState } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { PaymentContext } from '@/context/paymentRequest';
import { requestPayment } from '@/utils/requestPayment';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';
import router from 'next/router';
import { getCompanyById } from '@/utils/getCompanyById';

const DataContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 10px;
  justify-items: center;
  width: 100%;
  padding: 30px 15px 0px 15px;
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

const StyledKey = styled(Typography)`
  && {
    font-size: 16px;
  }
`;

const StyledValue = styled(Typography)`
  && {
    font-size: 16px;
    color: #62635b;
  }
`;

interface StepProps {
  updateStep: (e: number) => void;
  back: number;
}
const StepFour: FC<StepProps> = ({ updateStep, back }) => {
  const { stepOne, stepTwo } = useContext(PaymentContext);
  const [partnerName, setPartnerName] = useState<string>('');
  const { user } = useMoralis();
  const handleSubmit = async () => {
    try {
      await requestPayment(user as Moralis.User, { ...stepOne, ...stepTwo });
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    (async () => {
      const company = await getCompanyById(stepOne.partner);
      setPartnerName(company.attributes.companyName);
    })();
  }, []);
  return (
    <StyledContainer>
      <TransactionCard
        onBack={() => updateStep(back)}
        onNext={() => handleSubmit()}
        onNextText='Submit'
      >
        <StyledTitle>Summary</StyledTitle>
        <DataContainer>
          <StyledKey>Trade Partner</StyledKey>
          <StyledValue>{partnerName}</StyledValue>

          <StyledKey>Amount</StyledKey>
          <StyledValue>{stepOne.amount}</StyledValue>

          <StyledKey>Order Refrence</StyledKey>
          <StyledValue>{stepOne.refrence}</StyledValue>

          <StyledKey>Request validity</StyledKey>
          <StyledValue>????</StyledValue>

          <StyledKey>Frieght Forwarder</StyledKey>
          <StyledValue>{stepTwo.freight}</StyledValue>

          <StyledKey>Origin Country</StyledKey>
          <StyledValue>{stepTwo.origin}</StyledValue>

          <StyledKey>Destination</StyledKey>
          <StyledValue>{stepTwo.destination}</StyledValue>

          <StyledKey>INCOTERMS</StyledKey>
          <StyledValue>{stepTwo.incoterms}</StyledValue>
        </DataContainer>
      </TransactionCard>
    </StyledContainer>
  );
};

export default StepFour;
