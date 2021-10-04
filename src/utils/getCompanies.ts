import Moralis from 'moralis';

export const getCompanies = async (user: Moralis.User) => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.notEqualTo('adminID', user.id);
  const results = await query.find();

  return results;
};
