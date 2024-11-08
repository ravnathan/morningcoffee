'use client';

import { getTransactionDatabyDay } from '@/libs/action/transaction';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import { TransactionDialy } from '@/types/transaction';

export default function SoldItemsReport() {
  const [data, setData] = useState<TransactionDialy | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTransactionDatabyDay();
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!data) {
    return (
      <Typography variant="h6" align="center" style={{ marginTop: '50px' }}>
        No data available
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Date</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Total Transactions</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Total Amount</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Cash (Count)</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Cash (Amount)</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Debit (Count)</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Debit (Amount)</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Sold Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.date} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.totalTransactions}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.totalAmount}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.cash.count}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.cash.amount}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.debit.count}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.debit.amount}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {transaction.soldItems.map((item) => (
                  <div key={item.variant}>
                    <strong>{item.name} ({item.variant})</strong>: {item.qty} x {item.totalPrice}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
