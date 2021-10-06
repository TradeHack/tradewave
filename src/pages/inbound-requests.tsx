import React from 'react';
import Layout from '@/components/layout';
import InboundTable from '@/components/RequestTable/Inbound';

const OutboundRequests = () => {
  return (
    <>
      <Layout>
        <InboundTable />
      </Layout>
    </>
  );
};

export default OutboundRequests;
