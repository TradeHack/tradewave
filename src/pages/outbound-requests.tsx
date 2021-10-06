import React from 'react';
import Layout from '@/components/layout';
import OutboundTable from '@/components/RequestTable/Outbound';

const OutboundRequests = () => {
  return (
    <>
      <Layout>
        <OutboundTable />
      </Layout>
    </>
  );
};

export default OutboundRequests;
