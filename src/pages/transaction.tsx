import React, { useState } from 'react';
import Layout from '@/components/layout';
import ContainerCenter from '@/components/common/Containers/Center';
import StepOne from '@/components/TransactionSteps/StepOne';
import StepTwo from '@/components/TransactionSteps/StepTwo';

enum Steps {
  StepOne,
  StepTwo,
  StepThree,
}

const Transaction = () => {
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
      default:
        break;
    }
  };

  return (
    <Layout>
      <ContainerCenter>{renderCurrentStep()}</ContainerCenter>
    </Layout>
  );
};

export default Transaction;
