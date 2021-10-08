import Moralis from 'moralis';

export const deleteTransaction = async (ref: string) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('refrence', ref);
  const result = (await query.first()) as any;
  try {
    await result.destroy();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
