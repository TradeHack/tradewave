import React from 'react';
import Layout from '../components/layout';
// import PaymentRequest from '../components/payment-request';
import TradeDetails from '../components/trade-details'
import { StylesProvider } from '@material-ui/core/styles';


export default function NewTransaction () {
  return (
    // TODO optional make #f5f5f5 background
    <Layout>
      {/*<PaymentRequest />*/}
      <TradeDetails />
    </Layout>
  );
}
