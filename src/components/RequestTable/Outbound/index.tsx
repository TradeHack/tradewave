import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Paper,
} from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { getTransactionsBySeller } from '@/utils/getTransactions';
import Moralis from 'moralis';
import { fetchMyCompany } from '@/utils/fetchMyCompany';
import { formatDate } from '@/utils/formatDate';
import { Transaction } from 'types/transactions';

const createData = (data: Transaction) => {
  const { amount, refrence, buyer, freight, origin, submitted, status, address } = data;
  return {
    amount,
    refrence,
    freight,
    origin,
    submitted,
    status,
    buyer: buyer.attributes.companyName,
    address
  };
};

const Outbound = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const { user } = useMoralis();

  useEffect(() => {
    if (user) {
      (async () => {
        const company = await fetchMyCompany(user as Moralis.User);
        const transactions = await getTransactionsBySeller(company);
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
              <TableCell>Buyer</TableCell>
              <TableCell align='right'>Goods</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Submitted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.buyer}>
                <TableCell component='th' scope='row'>
                  {row.buyer}
                </TableCell>
                <TableCell align='right'>ABC</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.status}</TableCell>
                <TableCell align='right'>{formatDate(row.submitted)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Outbound;
