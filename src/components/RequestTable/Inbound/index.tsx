import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  Button,
} from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { getTransactionsByBuyer } from '@/utils/getTransactions';
import Moralis from 'moralis';
import { fetchMyCompany } from '@/utils/fetchMyCompany';
import { formatDate } from '@/utils/formatDate';
import { Transaction } from 'types/transactions';
import Link from 'next/link';
import { Factory } from '../../../../ethereum/factory';

const createData = (data: Transaction) => {
  const { amount, refrence, buyer, freight, origin, submitted, status } = data;
  return {
    amount,
    refrence,
    freight,
    origin,
    submitted,
    status,
    buyer: buyer.attributes.companyName,
  };
};

const Outbound = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [requests, setRequests] = useState<string[]>([])
  const { user, web3, enableWeb3, isWeb3Enabled } = useMoralis();
    enableWeb3({provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY})
  const getTransactions = async () => {
    const factory = await Factory(web3)

    const requests = await factory.methods.getDeployedRequests().call()
    setRequests(requests)
    console.log('requests', requests)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      getTransactions()
    }
  }, [isWeb3Enabled])


  useEffect(() => {
    if (user) {
      (async () => {
        const company = await fetchMyCompany(user as Moralis.User);
        const transactions = await getTransactionsByBuyer(company);
        const parsedData = transactions.map((transaction) =>
          createData({
            ...transaction.attributes,
            submitted: transaction.createdAt,
          } as Transaction)
        );
        setRows(parsedData);
      })();
    }
  }, [user]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Seller</TableCell>
              <TableCell align='right'>Goods</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Submitted</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.seller}>
                <TableCell component='th' scope='row'>
                  {row.buyer}
                </TableCell>
                <TableCell align='right'>ABC</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.status}</TableCell>
                <TableCell align='right'>{formatDate(row.submitted)}</TableCell>
                <TableCell align='right'>
                  <Link
                    href={{
                      pathname: 'pay-bill/[refrence]/[address]',
                      query: { refrence: row.refrence, address: requests[0] },
                    }}
                    as={`/pay-bill/${row.refrence}/${requests[0]}`}
                  >
                    <Button style={{ backgroundColor: 'red', color: 'white' }}>
                      Pay
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Outbound;
