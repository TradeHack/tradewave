import Moralis from 'moralis';

export const updateTransaction = async (ref: string, status: string) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('refrence', ref);
  const result = (await query.first()) as any;
  try {
    await result.set('status', status);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
