import Moralis from 'moralis';
//TODO: create a type for company
export const getTransactionsBySeller = async (company: any) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('seller', company);
  const results = await query.find();
  return results;
};

export const getTransactionsByBuyer = async (company: any) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('buyer', company);
  const results = await query.find();
  return results;
};

export const getTransactionByRefrence = async (refrence: string) => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.equalTo('refrence', refrence);
  const results = await query.find();
  return results[0];
};

export const getAllTransactions = async () => {
  const Transaction = Moralis.Object.extend('Transaction');
  const query = new Moralis.Query(Transaction);
  query.limit(25);
  const results = await query.find();
  return results;
};
