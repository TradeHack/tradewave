import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';

import { StyledGrid } from './styles';
import StatsCard from '@/components/Cards/StatsCard';

export default function Balances() {
  const [balance, setBalance] = useState('')
  const Web3Api = useMoralisWeb3Api()
  const { user, web3 } = useMoralis();
  useEffect(() => {
    const fetchBlock = async() => {
      if (user && web3) {
        const result = await Web3Api.account.getNativeBalance({
          address: user.attributes.ethAddress
        })
        setBalance(web3.utils.fromWei(result.balance, 'ether'))
      }
    }
    fetchBlock()
  }, [])

  return (
    <StyledGrid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <StatsCard
          name='Available funds'
          value={`${balance} eth`}
          tooltip='Your current balance available for new transactions'
        />
        <Button size='small'>How to add or withdraw funds</Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatsCard
          name='Expected payments'
          value='10,430 USD'
          tooltip='The sum of all payments outstanding directed towards your account sum of all payments outstanding directed towards your accountst'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatsCard
          name='Locked funds'
          value='3,450 USD'
          tooltip='The sum of all payments locked on contracts with your trade partners'
        />
      </Grid>
    </StyledGrid>
  )
}
