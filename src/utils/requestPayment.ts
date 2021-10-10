import Moralis from 'moralis';
import { IStepOne, IStepTwo } from '@/context/paymentRequest';

interface Values extends IStepOne, IStepTwo {
  address: string
}

export const requestPayment = async (user: Moralis.User, values: Values) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.equalTo('owner', user);
  const [company] = await query.find();
  const newTransaction = new Transaction();
  Object.entries(values).forEach(([key, value]) => {
    newTransaction.set(key, value);
  });
  newTransaction.set('seller', company);
  await newTransaction.save();
};
