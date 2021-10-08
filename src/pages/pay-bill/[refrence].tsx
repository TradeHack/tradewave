import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import Layout from '@/components/layout';
import { getTransactionByRefrence } from '@/utils/getTransactions';
import {Factory} from '../../../ethereum/factory'
import {ReceivePayment} from '../../../ethereum/receivePayment'
import { useMoralis } from 'react-moralis';

const PayBill = () => {
  const router = useRouter();
  const { web3, enableWeb3 } = useMoralis()
  enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NOTES_ENDPOINT_KOVAN})
  const { refrence } = router.query;
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const result = await getTransactionByRefrence(refrence as string);
      const { buyer, seller, amount } = result.attributes;
      setTransaction({
        amount,
        buyer: buyer.attributes.companyName,
        seller: seller.attributes.companyName,
      });
    })();
  });

  const handleAccept = async () => {
    try {
      // @ts-ignore
      const accounts = await web3?.eth.getAccounts()
      // @ts-ignore
      if (web3 && accounts) {
        // @ts-ignore
        await Factory(web3)
        await ReceivePayment(accounts[0]).methods.confirmPurchase()
     }
     router.push('/')
    } catch (e) {
      console.log('err', e)
    }
  }

  const handleDecline = async () => {
    // Contract is never created in this case, just update status on backend
    router.push('/')
  }
  return (
    <div>
      <Layout>
        {transaction && (
          <Card>
            <CardContent>
              <Typography variant='body1'>
                {transaction.seller} requests {transaction.amount} Rai
              </Typography>
            </CardContent>
            <CardActions>
              <Button style={{ backgroundColor: 'green' }} size='small' onClick={handleAccept}>
                Accept
              </Button>
              <Button style={{ backgroundColor: 'red' }} size='small' onClick={handleDecline}>
                Decline
              </Button>
            </CardActions>
          </Card>
        )}
      </Layout>
    </div>
  );
};

export default PayBill;
