import Moralis from 'moralis';
import { Status } from '../types/transactions';

export const updateTransaction = async (ref: string, status: Status) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('refrence', ref);
  const result = (await query.first()) as any;
  try {
    await result.set('status', status);
    await result.save()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
