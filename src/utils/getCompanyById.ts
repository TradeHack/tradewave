import Moralis from 'moralis';

export const getCompanyById = async (companyId: string) => {
  const Company = Moralis.Object.extend('Company');
  const query = new Moralis.Query(Company);
  query.equalTo('objectId', companyId);
  const results = await query.find();

  return results[0];
};
