import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@material-ui/core';
import Layout from '@/components/layout';
import { getTransactionByRefrence } from '@/utils/getTransactions';
import { ReceivePayment } from '../../../../ethereum/receivePayment';
import { useMoralis } from 'react-moralis';
import { updateTransaction } from '@/utils/updateTransaction';
import { Status } from '../../../types/transactions';

const PayBill = () => {
  const router = useRouter();
  const { web3, enableWeb3, isWeb3Enabled } = useMoralis()
  const { refrence, address } = router.query;
  const [transaction, setTransaction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

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
  }, []);

  useEffect(() => {
    enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY})

  }, [isWeb3Enabled]);

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
  }, []);

  const handleAccept = async () => {
    setIsLoading(true)
    try {
      // @ts-ignore
      const accounts = await web3?.eth.getAccounts()
      // @ts-ignore
      if (web3 && accounts) {
        const contract = ReceivePayment(address, web3)
        await contract.methods.confirmPurchase().send({from: accounts[0], value: transaction.amount})
      }
      await updateTransaction(refrence as string, Status.live);

      router.push('/')
    } catch (e) {
      alert(e)
    }
    setIsLoading(false)
  }

  const handleDecline = async () => {
    try {
      // @ts-ignore
      const accounts = await web3?.eth.getAccounts()
      if (web3 && accounts) {
        const contract = ReceivePayment(address, web3)
        await contract.methods.decline().send({from: accounts[0]})
      }
      await updateTransaction(refrence as string, Status.declined);
    } catch (e) {
      alert(e)
    }
    router.push('/')
  }
  return (
    <div>
      <Layout>
        {transaction && !isLoading && (
          <Card>
            <CardContent>
              <Typography variant='body1'>
                {transaction.seller} requests {transaction.amount} Eth
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
        {isLoading && <CircularProgress />}
      </Layout>
    </div>
  );
};

export default PayBill;
