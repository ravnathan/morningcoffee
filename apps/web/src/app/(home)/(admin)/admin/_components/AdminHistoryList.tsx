import { getTransactionData, getTransactionDataByDate } from '@/libs/action/transaction';
import { TransactionResponse } from '@/types/transaction';
import { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@mui/material';
import { formatToRupiah } from '@/libs/formatrupiah';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AdminHistory() {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = async () => {
    try {
      if (selectedDate) {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const dat = await getTransactionDataByDate(formattedDate);
        setData(dat);
      } else {
        const dat = await getTransactionData();
        setData(dat);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false)
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.transactions.filter((transaction) =>
    transaction.transaction_items.some((item) => item.product_name.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div>
      <div className="pb-10">
        <div className="flex justify-between items-center">
          <Button variant="contained" onClick={() => setShowCalendar((prev) => !prev)}>
            Filter Date
          </Button>
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
            {filteredData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ fontStyle: 'italic' }}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredData?.map((transaction) =>
                transaction.transaction_items.map((item, index) => (
                  <TableRow key={index}>
                    {index === 0 && (
                      <TableCell rowSpan={transaction.transaction_items.length} sx={{ borderRight: '1px solid #E0E0E0' }}>
                        {format(new Date(transaction.transaction_date), 'dd MMM yyyy HH:mm:ss')}
                      </TableCell>
                    )}
                    {index === 0 && (
                      <TableCell rowSpan={transaction.transaction_items.length} sx={{ borderRight: '1px solid #E0E0E0' }}>
                        {transaction.cashier_fullname}
                      </TableCell>
                    )}
                    {index === 0 && (
                      <TableCell rowSpan={transaction.transaction_items.length} sx={{ borderRight: '1px solid #E0E0E0' }}>
                        {formatToRupiah(transaction.total_price)}
                      </TableCell>
                    )}
                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{item.product_name}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #E0E0E0', textAlign: 'center' }}>{item.variant}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatToRupiah(item.price)}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{item.qty}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatToRupiah(item.price * item.qty)}</TableCell>
                    {index === 0 && (
                      <TableCell
                        rowSpan={transaction.transaction_items.length}
                        sx={{ borderRight: '1px solid #E0E0E0', textAlign: 'center' }}
                      >
                        {transaction.payment_type}
                      </TableCell>
                    )}
                  </TableRow>
                )),
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
