import Moralis from 'moralis';

/*
  fetch companies that are not assocaited with the current user
*/

export const getCompanies = async (user: Moralis.User) => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  // TODO: Add the following line back in when there are more companies to choose from
  // query.notEqualTo('owner', user);
  const results = await query.find();
  return results;
};
