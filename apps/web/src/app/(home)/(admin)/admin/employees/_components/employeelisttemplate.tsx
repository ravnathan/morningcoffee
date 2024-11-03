import { CashierFetch } from '@/types/user';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import PreviewModal from './previewmodal';

interface CashierTemplate extends CashierFetch {
  idx: number;
  onDelete: (cashier_id: string) => void;
  id: string;
}

export default function EmployeeListTemplate({
  idx,
  username,
  fullname,
  role,
  avatar,
  onDelete,
  id,
}: CashierTemplate) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="mx-20 h-10 bg-superlightbrown flex justify-between items-center px-5 text-black font-semibold border-t border-gray-400">
        <div className="flex gap-10">
          <p className="w-5">{idx}</p>
          <p className="w-32">{username}</p>
          <p className="w-[500px] text-left">{fullname}</p>
          <p className="w-12 text-center">{role}</p>
          <div className="w-[200px] flex items-center justify-center">
            <button
              type="button"
              className="bg-coffee py-[2px] px-4 text-white rounded-full text-sm"
              onClick={() => setOpenModal(true)}
            >
              preview
            </button>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-10">
            <button className="cursor-pointer hover:text-blue-500">
              <FaEdit />
            </button>
          </div>
          <button className="w-10 mx-auto" onClick={() => onDelete(id)}>
            <div className="cursor-pointer hover:text-red-500">
              <FaTrash />
            </div>
          </button>
        </div>
      </div>
      {openModal && (
        <PreviewModal
          children={avatar}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
