import Moralis from 'moralis';

export const userHasCompany = async (
  currentUser: Moralis.User
): Promise<boolean> => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.equalTo('owner', currentUser);
  const results: Array<unknown> = await query.find();
  return Boolean(results.length);
};
