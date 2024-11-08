import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getCashierShiftDetails } from '@/libs/action/transaction';
import { CashierShiftData, ShiftData } from '@/types/transaction';
import { format } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ShiftDetails() {
  const [data, setData] = useState<CashierShiftData>();

  const fetchData = async () => {
    try {
      const res = await getCashierShiftDetails();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDateTime = (dateString: string) => format(new Date(dateString), 'dd-MMM-yyyy, HH:mm:ss');

  return (
    <div className='pt-10'>
      <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Cashier Name</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Start Shift Time</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>End Shift Time</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Start Value</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>End Value</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Total Cash</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Total Debit</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Shift Value Difference</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Total Income</TableCell>
              <TableCell sx={{ fontWeight: '600', textAlign: 'center' }}>Match</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              Object.entries(data).flatMap(([cashierName, shifts]) =>
                shifts.map((shift: ShiftData, index: number) => (
                  <TableRow key={`${cashierName}-${index}`}>
                    <TableCell sx={{ textAlign: 'center' }}>{cashierName}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatDateTime(shift.startShiftTime)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{formatDateTime(shift.endShiftTime)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.startShiftValue}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.endShiftValue}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.totalCash}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.totalDebit}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.shiftValueDifference}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{shift.totalIncome}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {shift.match ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
                    </TableCell>
                  </TableRow>
                )),
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
