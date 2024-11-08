'use client';

import { CashierList } from '@/types/user';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/confirmationmodal';
import { deleteCashierData, getCashier } from '@/libs/action/admin';
import EmployeeModal from './editingdata/EmployeeModal';
import EditFullname from './editingdata/EditFullname';
import PreviewModal from './PreviewModal';

export default function EmployeeList() {
  const [data, setData] = useState<CashierList | null>(null);
  const [deleteCashier, setDeleteCashier] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editCashier, setEditCashier] = useState<string>('');
  const [editFullname, seteditFullname] = useState<string>('');
  const [editAvatar, setEditAvatar] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

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

  const handleEdit = (cashieruser: string) => {
    seteditFullname(cashieruser);
    setOpenModal(true);
  };

  const handlePreview = (cashierAvatar: string, cashierUser: string) => {
    setEditCashier(cashierUser);
    setEditAvatar(cashierAvatar);
    setPreviewModal(true);
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
              <TableCell>
                <button
                  onClick={() => handleEdit(cashier.username)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {cashier.fullname}
                </button>
              </TableCell>
              <TableCell>{cashier.role}</TableCell>
              <TableCell>
                <button onClick={() => handlePreview(cashier.avatar, cashier.username)}>
                  {cashier.avatar ? <Image src={cashier.avatar} alt={`${cashier.fullname}'s portrait`} width={50} height={50} /> : '-'}
                </button>
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
      {openModal && (
        <EmployeeModal
          closeModal={() => setOpenModal(false)}
          children={<EditFullname editFullname={editFullname} setOpenModal={() => setOpenModal(false)} />}
        />
      )}
      {previewModal && <PreviewModal username={editCashier} avatar={editAvatar} closeModal={() => setPreviewModal(false)} />}
    </TableContainer>
  );
}
