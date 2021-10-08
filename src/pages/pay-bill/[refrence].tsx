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
import { useMoralis } from 'react-moralis';
import RequestFactory from '../../../ethereum/build/RequestFactory.json'
import web3 from '../../../ethereum/web3'

const PayBill = () => {
  const router = useRouter();

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
      const accounts = await web3?.eth.getAccounts()
      if (web3 && accounts) {
       const factory = new web3.eth.Contract(
         RequestFactory.abi,
         '0xd9145CCE52D386f254917e481eB44e9943F39138'
       )
      console.log('factory', factory)
     }
    } catch (e) {
      console.log('err', e)
    }
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
              <Button style={{ backgroundColor: 'red' }} size='small'>
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
