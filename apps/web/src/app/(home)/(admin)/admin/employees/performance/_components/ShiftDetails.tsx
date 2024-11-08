import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { getCashierShiftDetails } from '@/libs/action/transaction';
import { CashierShiftData, ShiftData } from '@/types/transaction';
import { format } from 'date-fns';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter, useSearchParams } from 'next/navigation';

interface ShiftDataWithCashier extends ShiftData {
  cashierName: string;
}

export default function ShiftDetails() {
  const [data, setData] = useState<CashierShiftData | null>(null);
  const [filteredData, setFilteredData] = useState<ShiftDataWithCashier[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchData = async () => {
    try {
      const res = await getCashierShiftDetails();
      setData(res);
      setFilteredData(flattenData(res)); 
    } catch (error) {
      console.log(error);
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
    if (selectedDate) params.set('date', format(selectedDate, 'yyyy-MM-dd'));
    if (searchQuery) params.set('search', searchQuery);
    router.replace(`?${params.toString()}`);
  }, [selectedDate, searchQuery, router]);

  const flattenData = (data: CashierShiftData): ShiftDataWithCashier[] => {
    return Object.entries(data).flatMap(([cashierName, shifts]) =>
      shifts.map((shift) => ({
        ...shift,
        cashierName, 
      }))
    );
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const formatDateTime = (dateString: string) => format(new Date(dateString), 'dd-MMM-yyyy, HH:mm:ss');

  const filterData = () => {
    if (!data) return [];

    let filtered = filteredData.filter((shift) => {
      const shiftDate = new Date(shift.startShiftTime).toDateString();
      const selectedDateString = selectedDate?.toDateString();
      const matchesDate = selectedDate ? shiftDate === selectedDateString : true;
      const matchesSearch = shift.cashierName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesSearch;
    });

    return filtered;
  };

  const filteredResults = filterData();

  return (
    <div>
      <div className="pb-10">
        <div className="flex justify-between items-center">
          <div>
            <Button variant="contained" onClick={() => setShowCalendar((prev) => !prev)}>
              Filter Date
            </Button>
            <Button variant="outlined" onClick={() => { setSelectedDate(null); setSearchQuery(''); }} sx={{ marginLeft: '1rem' }}>
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
              label="Search Cashier"
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

      {/* Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Cashier Name</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Start Shift Time</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>End Shift Time</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Start Value</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>End Value</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Total Cash</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Total Debit</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Shift Value Difference</TableCell>
              <TableCell sx={{ fontWeight: '600', borderRight: '1px solid #E0E0E0' }}>Total Income</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Match</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ fontStyle: 'italic' }}>
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredResults?.map((shift, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.cashierName}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatDateTime(shift.startShiftTime)}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{formatDateTime(shift.endShiftTime)}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.startShiftValue}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.endShiftValue}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.totalCash}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.totalDebit}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.shiftValueDifference}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #E0E0E0' }}>{shift.totalIncome}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {shift.match ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
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
