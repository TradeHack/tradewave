import React, { FC } from 'react';
import TransactionCard from '@/components/Cards/TransactionCard';
import RadioButtons from '@/components/common/Inputs/RadioInputs';
import Radio from '@/components/common/Inputs/RadioInputs/RadioButton';

enum Options {
  Request,
  Make,
}

interface StepProps {
  updateStep: (e: number) => void;
  next: number;
}
const StepOne: FC<StepProps> = ({ updateStep, next }) => {
  const renderRadioButtons = () => (
    <>
      <Radio value={Options.Request.toString()} label='Request a payment' />
      <Radio value={Options.Make.toString()} label='Make a payment' />
    </>
  );
  return (
    <TransactionCard
      // eslint-disable-next-line no-console
      onBack={() => console.log('back')}
      onNext={() => updateStep(next)}
    >
      <RadioButtons
        title='What would you like to do?'
        radioButtons={renderRadioButtons()}
        initialValue={Options.Request.toString()}
      />
    </TransactionCard>
  );
};

export default StepOne;
