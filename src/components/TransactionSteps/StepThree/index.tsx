import React, { FC, useContext, useEffect, useState } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@material-ui/core';
import { PaymentContext } from '@/context/paymentRequest';
import { requestPayment } from '@/utils/requestPayment';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';
import router from 'next/router';
import { getCompanyById } from '@/utils/getCompanyById';
import { Factory } from '../../../../ethereum/factory';

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
  const [isLoading, setIsLoading] = useState<any>(false);
  const [partnerName, setPartnerName] = useState<string>('');
  const { user, web3, enableWeb3, isWeb3Enabled } = useMoralis();
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await requestPayment(user as Moralis.User, { ...stepOne, ...stepTwo });
      const factory = await Factory(web3)
      const accounts = await web3?.eth.getAccounts()
     if (accounts) {
       await factory.methods.createRequest(stepOne.amount, '0xB65B2d2Bd1d5B228446e35786DBb9206B360F2D3').send({
         from: accounts[0]
       })
     }
      router.push('/');
    } catch (error) {
      alert(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY})
  }, [isWeb3Enabled]);

  useEffect(() => {
    (async () => {
      const company = await getCompanyById(stepOne.buyer.id);
      setPartnerName(company.attributes.companyName);
    })();
  }, []);
  return (
    <StyledContainer>
      {!isLoading && (
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
      )}
      {isLoading && (
        <>
          <CircularProgress />
          <p>We're processing your request</p>
        </>
      )}
    </StyledContainer>
  );
};

export default StepFour;
