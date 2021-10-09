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
import {Factory} from '../../../ethereum/factory'
import {ReceivePayment} from '../../../ethereum/receivePayment'
import { useMoralis } from 'react-moralis';

const PayBill = () => {
  const router = useRouter();
  const { web3, enableWeb3 } = useMoralis()
  enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY})
  const { refrence } = router.query;
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
        // @ts-ignore
        const factory = await Factory(web3)
        const request = await factory.methods.createRequest(1, '0xB65B2d2Bd1d5B228446e35786DBb9206B360F2D3').send({
          from: accounts[0]
        })
        console.log('new request', request)
        const requests = await factory.methods.getDeployedRequests().call()
        console.log('requests', requests)
        const contract = ReceivePayment(requests[requests.length - 1])
        await contract.methods.confirmPurchase().send({from: accounts[0]})

        //request.methods.confirmPurchase()
      }
     router.push('/')
    } catch (e) {
      console.log('err', e)
    }
    setIsLoading(false)
  }

  const handleDecline = async () => {
    // Contract is never created in this case, just update status on backend
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
