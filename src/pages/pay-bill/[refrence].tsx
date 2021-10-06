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
              <Button style={{ backgroundColor: 'green' }} size='small'>
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
