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
  Typography,
} from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { getAllTransactions } from '@/utils/getTransactions';
import Moralis from 'moralis';
import { formatDate } from '@/utils/formatDate';
import { Transaction } from 'types/transactions';
import Link from 'next/link';
import Modal from '@/components/dialog';

const createData = (data: Transaction) => {
  const {
    amount,
    refrence,
    buyer,
    freight,
    origin,
    submitted,
    status,
    seller,
  } = data;
  return {
    amount,
    refrence,
    freight,
    origin,
    submitted,
    status,
    buyer: buyer.id,
    seller: seller.id,
  };
};

const Logistics = () => {
  const [rows, setRows] = useState<Transaction[]>([]);
  const [requests, setRequests] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { user, web3, enableWeb3, isWeb3Enabled } = useMoralis();
  // enableWeb3({
  //   provider: process.env.NEXT_PUBLIC_SPEEDY_NODES_ENDPOINT_RINKEBY,
  // });
  // const getTransactions = async () => {
  //   setRequests(requests);
  // };

  useEffect(() => {
    if (user) {
      (async () => {
        const transactions = await getAllTransactions();
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

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatus = async (status: string, ref: any) => {
    const Transaction = Moralis.Object.extend('Transaction');
    const query = new Moralis.Query(Transaction);
    query.equalTo('refrence', ref);
    const results = await query.find();
    results[0].set('status', status);
    results[0].save();

    const transactions = await getAllTransactions();
    const parsedData = transactions.map((transaction) =>
      createData({
        ...transaction.attributes,
        submitted: transaction.createdAt,
      } as Transaction)
    );
    setRows(parsedData);
  };
  return (
    <>
      <div style={{ padding: '40px' }}>
        <Typography>Logistics Dashboard</Typography>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Buyer</TableCell>
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
              {rows.map((row, i) => (
                <TableRow key={row.seller}>
                  <TableCell component='th' scope='row'>
                    {row.buyer}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.seller}
                  </TableCell>
                  <TableCell align='right'>ABC</TableCell>
                  <TableCell align='right'>{row.amount}</TableCell>
                  <TableCell align='right'>{row.status}</TableCell>
                  <TableCell align='right'>
                    {formatDate(row.submitted)}
                  </TableCell>
                  <TableCell align='right'>
                    <Link
                      href={{
                        pathname: 'pay-bill/[refrence]/[address]',
                        query: { refrence: row.refrence, address: requests[0] },
                      }}
                      as={`/pay-bill/${row.refrence}/${requests[0]}`}
                    >
                      <Modal
                        isOpen={open}
                        dialogText='Choose status of shipment'
                        actions={true}
                        defaultButton='update'
                      >
                        <div>
                          <Button
                            onClick={() =>
                              changeStatus('in transit', row.refrence)
                            }
                          >
                            In transit
                          </Button>
                          <Button
                            onClick={() =>
                              changeStatus('delivered', row.refrence)
                            }
                          >
                            Delivered
                          </Button>
                        </div>
                      </Modal>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Logistics;
