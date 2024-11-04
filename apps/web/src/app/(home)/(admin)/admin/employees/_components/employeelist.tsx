'use client';

import { deleteCashierData, getCashier } from '@/libs/action/user';
import { CashierList } from '@/types/user';
import { useEffect, useState } from 'react';
import EmployeeListTemplate from './employeelisttemplate';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/confirmationmodal';

export default function EmployeeList() {
  const [data, setData] = useState<CashierList>();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteCashier, setDeleteCashier] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [editCashier, setEditCashier] = useState<string | null>(null);
  const [editConfirmation, setEditConfirmation] = useState(false);

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

  const handleDelete = (cashier_id: string) => {
    setDeleteCashier(cashier_id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (deleteCashier !== null) {
      try {
        const res = await deleteCashierData(deleteCashier);
        if (!res.ok) {
          throw new Error('Failed to delete data');
        }
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
    <div className="border-t-2 border-coffee">
      <div className="mx-20 h-10 bg-coffee flex justify-between items-center px-5 text-white font-semibold mt-32">
        <div className="flex gap-10">
          <p className="w-5">No.</p>
          <p className="w-32">Username</p>
          <p className="w-[500px] text-center">Full Name</p>
          <p className="w-12 text-center">Role</p>
          <p className="w-[200px] text-center">Portrait</p>
        </div>
        <div className="flex gap-8 mr-4">
          <div className="w-10">Edit</div>
          <div className="w-10">Delete</div>
        </div>
      </div>
      {data?.cashiersData.map((cashier, index) => (
        <EmployeeListTemplate
          idx={index}
          fullname={cashier.fullname}
          username={cashier.username}
          role={cashier.role}
          avatar={cashier.avatar}
          id={cashier.id}
          onDelete={handleDelete}
        />
      ))}

      {deleteConfirmation && (
        <ConfirmationModal
          isOpen={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
          onConfirm={confirmDelete}
          header="Confirm Deletion"
          message="Are you sure you want to delete this user?"
        />
      )}
    </div>
  );
}
