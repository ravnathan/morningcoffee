import { getTransactionData } from '@/libs/action/transaction';
import { TransactionResponse } from '@/types/transaction';
import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@date-io/date-fns';
import { formatToRupiah } from '@/libs/formatrupiah';
import { format } from 'date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function Trying() {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const fetchData = async () => {
    try {
      const dat = await getTransactionData();
      setData(dat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              borderTop: '2px solid black',
              borderBottom: '2px solid black',
            }}
          >
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Transaction Date</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Cashier</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Total Price</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Product Name</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Variant</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #E0E0E0' }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Payment Type</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.transactions.map((transaction) =>
            transaction.transaction_items.map((item, index) => (
              <TableRow key={index}>
                {index === 0 && (
                  <TableCell
                    rowSpan={transaction.transaction_items.length}
                    sx={{
                      borderRight: '1px solid #E0E0E0',
                    }}
                  >
                    {format(new Date(transaction.transaction_date), 'dd MMM yyyy HH:mm:ss')}
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell
                    rowSpan={transaction.transaction_items.length}
                    sx={{
                      borderRight: '1px solid #E0E0E0',
                    }}
                  >
                    {transaction.cashier_fullname}
                  </TableCell>
                )}
                {index === 0 && (
                  <TableCell
                    rowSpan={transaction.transaction_items.length}
                    sx={{
                      borderRight: '1px solid #E0E0E0',
                    }}
                  >
                    {formatToRupiah(transaction.total_price)}
                  </TableCell>
                )}
                <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{item.product_name}</TableCell>
                <TableCell
                  sx={{
                    borderRight: '1px solid #E0E0E0',
                    textAlign: 'center',
                  }}
                >
                  {item.variant}
                </TableCell>
                <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatToRupiah(item.price)}</TableCell>
                <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{item.qty}</TableCell>
                <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatToRupiah(item.price * item.qty)}</TableCell>
                {index === 0 && (
                  <TableCell
                    rowSpan={transaction.transaction_items.length}
                    sx={{
                      borderRight: '1px solid #E0E0E0',
                      textAlign: 'center',
                    }}
                  >
                    {transaction.payment_type}
                  </TableCell>
                )}
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
