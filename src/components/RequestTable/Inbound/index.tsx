import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { getTransactionsByBuyer } from '@/utils/getTransactions';
import Moralis from 'moralis';
import { fetchMyCompany } from '@/utils/fetchMyCompany';
import { formatDate } from '@/utils/formatDate';
import { Status, Transaction } from 'types/transactions';
import Modal from '@/components/dialog';
import { deleteTransaction } from '@/utils/deleteTransaction';
import Link from 'next/link';

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
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useMoralis();

  const handleDelete = async (row: any) => {
    await deleteTransaction(row.refrence);
    const company = await fetchMyCompany(user as Moralis.User);
    const transactions = await getTransactionsByBuyer(company);
    const parsedData = transactions.map((transaction) =>
      createData({
        ...transaction.attributes,
        submitted: transaction.createdAt,
      } as Transaction)
    );
    setRows(parsedData);
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const company = await fetchMyCompany(user as Moralis.User);
        const transactions = await getTransactionsByBuyer(company);
        const parsedData = transactions.map((transaction) =>
          createData({
            ...transaction.attributes,
            submitted: transaction.createdAt
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
              <TableCell align='right'></TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.seller}>
                <TableCell component='th' scope='row'>
                  {row.buyer}
                </TableCell>
                <TableCell align='right'>ABC</TableCell>
                <TableCell align='right'>{row.amount}</TableCell>
                <TableCell align='right'>{row.status}</TableCell>
                <TableCell align='right'>{formatDate(row.submitted)}</TableCell>
                <TableCell align='right'>
                  {row.status === Status.pending && (
                    <Link
                      href={{
                        pathname: 'pay-bill/[refrence]/[address]',
                        query: { refrence: row.refrence, address: row.address },
                      }}
                      as={`/pay-bill/${row.refrence}/${row.address}`}
                    >
                      <Button
                        style={{ backgroundColor: 'green', color: 'white' }}
                      >
                        Pay
                      </Button>
                    </Link>
                  )}
                </TableCell>
                <TableCell align='right'>
                  <Modal
                    isOpen={open}
                    closeAction={() => {
                      setOpen(false);
                    }}
                    dialogText='Are you sure you want to delete?'
                    confirmAction={() => handleDelete(row)}
                  />
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
