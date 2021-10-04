import React, { useState } from 'react';
import Layout from '@/components/layout';
import ContainerCenter from '@/components/common/Containers/Center';
import StepOne from '@/components/TransactionSteps/StepOne';
import StepTwo from '@/components/TransactionSteps/StepTwo';
import StepThree from '@/components/TransactionSteps/StepThree';
import PaymentRequestProvider, { Steps } from '@/context/paymentRequest';

const RequestPayment = () => {
  const [currentStep, setStep] = useState<number>(Steps.StepOne);

  const updateStep = (step: number) => {
    setStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case Steps.StepOne:
        return <StepOne updateStep={updateStep} next={Steps.StepTwo} />;
      case Steps.StepTwo:
        return (
          <StepTwo
            updateStep={updateStep}
            back={Steps.StepOne}
            next={Steps.StepThree}
          />
        );
      case Steps.StepThree:
        return <StepThree updateStep={updateStep} back={Steps.StepTwo} />;
      default:
        break;
    }
  };

  return (
    <Layout>
      <ContainerCenter>
        <PaymentRequestProvider>{renderCurrentStep()}</PaymentRequestProvider>
      </ContainerCenter>
    </Layout>
  );
};

export default RequestPayment;
