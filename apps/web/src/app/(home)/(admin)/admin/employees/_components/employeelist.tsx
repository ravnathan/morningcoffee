'use client';

import { deleteCashierData, getCashier } from '@/libs/action/user';
import { CashierList } from '@/types/user';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/confirmationmodal';

export default function EmployeeList() {
  const [data, setData] = useState<CashierList | null>(null);
  const [deleteCashier, setDeleteCashier] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getCashier();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (cashierId: string) => {
    setDeleteCashier(cashierId);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (deleteCashier) {
      try {
        const res = await deleteCashierData(deleteCashier);
        if (!res.ok) throw new Error('Failed to delete data');
        await fetchData();
        toast.success('Data has been deleted');
      } catch (error) {
        toast.error("Can't delete data");
      } finally {
        setDeleteConfirmation(false);
        setDeleteCashier(null);
      }
    }
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: '600' }}>No.</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Username</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Full Name</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Role</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Portrait</TableCell>
            <TableCell sx={{ fontWeight: '600' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.cashiersData.map((cashier, index) => (
            <TableRow key={cashier.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{cashier.username}</TableCell>
              <TableCell>{cashier.fullname}</TableCell>
              <TableCell>{cashier.role}</TableCell>
              <TableCell>
                {cashier.avatar ? (
                  <Image
                    src={cashier.avatar}
                    alt={`${cashier.fullname}'s portrait`}
                    width={50}
                    height={50}
                  />
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(cashier.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {deleteConfirmation && (
        <ConfirmationModal
          isOpen={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
          onConfirm={confirmDelete}
          header="Confirm Deletion"
          message="Are you sure you want to delete this user?"
        />
      )}
    </TableContainer>
  );
}
