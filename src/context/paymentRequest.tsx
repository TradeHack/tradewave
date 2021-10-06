import React, { useState, createContext, FC } from 'react';

export interface IStepOne {
  amount: string;
  refrence: string;
  //todo add the type for buyer
  buyer: any;
}

export interface IStepTwo {
  freight: string;
  origin: string;
  destination: string;
  incoterms: string;
}

const defaultState = {
  stepOne: { amount: '', refrence: '', buyer: '' },
  stepTwo: { freight: '', origin: '', destination: '', incoterms: '' },
};

interface IPaymentContext {
  stepOne: IStepOne;
  stepTwo: IStepTwo;
  setData?: (type: number, data: DataTypes) => void;
}

export enum Steps {
  StepOne,
  StepTwo,
  StepThree,
}

type DataTypes = IStepOne | IStepTwo;

export const PaymentContext = createContext<IPaymentContext>(defaultState);

const PaymentProvider: FC = ({ children }) => {
  const [stepOne, setStepOne] = useState<IStepOne>(defaultState.stepOne);
  const [stepTwo, setStepTwo] = useState<IStepTwo>(defaultState.stepTwo);

  const setData = (type: number, data: DataTypes) => {
    switch (type) {
      case Steps.StepOne:
        setStepOne(data as IStepOne);
        break;
      case Steps.StepTwo:
        setStepTwo(data as IStepTwo);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <PaymentContext.Provider value={{ stepOne, stepTwo, setData }}>
        {children}
      </PaymentContext.Provider>
    </>
  );
};

export default PaymentProvider;
