import React from 'react';
import { Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';

import Layout from '../components/layout';
import Balances from '../components/balances';
import EnhancedTable from 'components/transactions';

export default function Home() {
  return (
    <Layout>
      <Typography variant="h4">Balances</Typography>
      <Divider />
      <Balances />
      <Typography variant="h4">Transactions</Typography>
      <Divider />
      <EnhancedTable />
    </Layout>
  );
}
