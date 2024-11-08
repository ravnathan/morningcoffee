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
  Button,
  TextField,
} from '@mui/material';
import { TransactionDialy } from '@/types/transaction';
import { formatToRupiah } from '@/libs/formatrupiah';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SoldItemsReport() {
  const [data, setData] = useState<TransactionDialy | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const dateFromURL = searchParams.get('date');
    const searchFromURL = searchParams.get('search') || '';
    if (dateFromURL) setSelectedDate(new Date(dateFromURL));
    setSearchQuery(searchFromURL);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate) params.set('date', selectedDate.toISOString().split('T')[0]);
    if (searchQuery) params.set('search', searchQuery);
    router.replace(`?${params.toString()}`);
  }, [selectedDate, searchQuery, router]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const resetFilters = () => {
    setSelectedDate(null);
    setSearchQuery('');
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const filteredData = data?.filter((transaction) => {
    if (selectedDate) {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() !== selectedDate.getFullYear() ||
        transactionDate.getMonth() !== selectedDate.getMonth() ||
        transactionDate.getDate() !== selectedDate.getDate()
      ) {
        return false;
      }
    }

    if (searchQuery) {
      return transaction.soldItems.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return true;
  });

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
    <div>
      <div className="pb-10">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="contained" onClick={() => setShowCalendar((prev) => !prev)}>
              Filter Date
            </Button>
            <Button variant="outlined" onClick={resetFilters} sx={{ marginLeft: '1rem' }}>
              Reset Filters
            </Button>
          </div>
          {showCalendar && (
            <div className="absolute z-40 top-[169px] left-96">
              <DatePicker selected={selectedDate} onChange={handleDateChange} inline dateFormat="yyyy-MM-dd" />
            </div>
          )}
          <div className="w-96">
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                marginBottom: '1rem',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                },
              }}
            />
          </div>
        </div>
      </div>
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
            {filteredData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ fontStyle: 'italic' }}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredData?.map((transaction) => (
                <TableRow key={transaction.date} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{formatDate(transaction.date)}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.totalTransactions}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{formatToRupiah(transaction.totalAmount)}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.cash.count}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{formatToRupiah(transaction.cash.amount)}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>{transaction.debit.count}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    {formatToRupiah(transaction.debit.amount)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    {transaction.soldItems.map((item) => (
                      <div key={item.variant}>
                        <strong>
                          {item.name} ({item.variant})
                        </strong>
                        : {item.qty} x {formatToRupiah(item.totalPrice)}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
