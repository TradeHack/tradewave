import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress
} from '@material-ui/core';
import Layout from '@/components/layout';
import { getTransactionByRefrence } from '@/utils/getTransactions';
import {ReceivePayment} from '../../../../ethereum/receivePayment'
import { useMoralis } from 'react-moralis';

const PayBill = () => {
  const router = useRouter();
  const { web3, enableWeb3 } = useMoralis()
  enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY})
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
        {isLoading && <CircularProgress />}
      </Layout>
    </div>
  );
};

export default PayBill;
