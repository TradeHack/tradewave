import React, { FC } from 'react';
import Layout from '@/components/layout';
import CreateCompanyForm from '@/components/CreateCompany';

const CreateCompany: FC = () => {
  return (
    <>
      <Layout showLinks={false}>
        <CreateCompanyForm />
      </Layout>
    </>
  );
};

export default CreateCompany;
