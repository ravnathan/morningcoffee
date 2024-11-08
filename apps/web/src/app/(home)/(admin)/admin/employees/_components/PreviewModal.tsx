import Image from 'next/image';
import CloseIcon from '../../_components/CloseIcon';
import { useState } from 'react';
import PictureModal from '../../_components/PictureModal';
import { editCashierAvatar } from '@/libs/action/admin';
import { toast } from 'react-toastify';
import { navigate } from '@/libs/action/server';

interface ModalProps {
  username: string;
  avatar: string;
  closeModal: () => void;
}

export default function PreviewModal({ username, avatar, closeModal }: ModalProps) {
  const [openModal, setOpenModal] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const onSubmit = async () => {
    try {
      const res = await editCashierAvatar(username, dataUrl!)
      toast.success(res.msg)
      navigate('/admin/employees')
    } catch (error) {
      toast.error("Can't change data")
    }
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-image-dialog"
    >
      <div className="relative rounded-2xl bg-floral text-black text-left shadow-xl transition-all">
        <div className="px-5 py-4 relative">
          <button
            type="button"
            className="absolute top-2 right-2 rounded-md p-1 text-black hover:bg-coffee hover:text-white focus:outline-none"
            onClick={closeModal}
          >
            <span className="sr-only">Close menu</span>
            <CloseIcon />
          </button>
          <div className="p-4 text-center">
            {avatar ? <Image src={avatar} alt={`${username}'s portrait`} width={300} height={300} /> : <p>No portrait available</p>}
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-coffee py-2 px-12 rounded-full text-white font-semibold text-lg" onClick={() => setOpenModal(true)}>
              Edit
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <PictureModal
          func={(imageDataUrl: string) => {
            setDataUrl(imageDataUrl);
            setOpenModal(false);
            onSubmit()
          }}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
