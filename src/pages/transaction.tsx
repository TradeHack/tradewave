import React, { useState } from 'react';
import Layout from '@/components/layout';
import ContainerCenter from '@/components/common/Containers/Center';
import StepOne from '@/components/TransactionSteps/StepOne';
import StepTwo from '@/components/TransactionSteps/StepTwo';
import StepThree from '@/components/TransactionSteps/StepThree';
import StepFour from '@/components/TransactionSteps/StepFour';

enum Steps {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
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
      case Steps.StepThree:
        return (
          <StepThree
            updateStep={updateStep}
            back={Steps.StepTwo}
            next={Steps.StepFour}
          />
        );
      case Steps.StepFour:
        return (
          <StepFour
            updateStep={updateStep}
            back={Steps.StepThree}
            next={Steps.StepFour}
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
