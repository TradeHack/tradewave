import Moralis from 'moralis';

export const userHasCompany = async (
  currentUser: Moralis.User
): Promise<boolean> => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.equalTo('adminID', currentUser.id);
  const results: Array<any> = await query.find();
  return Boolean(results.length);
};
