import Moralis from 'moralis';
import { FormValues } from '@/components/CreateCompany';

export const createCompany = async (values: FormValues, user: Moralis.User) => {
  const Company = Moralis.Object.extend('Company');
  const newCompany = new Company();
  Object.entries(values).forEach(([key, value]) => {
    newCompany.set(key, value);
  });
  newCompany.set('owner', user);
  await newCompany.save();
};
