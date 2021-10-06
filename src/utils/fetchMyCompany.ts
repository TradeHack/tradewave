import Moralis from 'moralis';

export const fetchMyCompany = async (user: Moralis.User) => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.equalTo('owner', user);
  const results = await query.find();

  return results[0];
};
