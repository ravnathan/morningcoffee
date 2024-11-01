'use client';

import { Input } from '@/components/inputformikblack';
import { createCashier } from '@/libs/action/user';
import { createCashierSchema } from '@/libs/schema';
import { CashierData } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useState } from 'react';
import PictureModal from '../../_components/picturemodal';

export default function EmployeeForm({closeModal} : {closeModal: () => void}) {
  const [openModal, setOpenModal] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const initialValues: CashierData = {
    username: '',
    fullname: '',
    password: '',
  };

  const onCreate = async (
    data: CashierData,
    dataUrl: string,
    resetForm: () => void,
  ) => {
    try {
      const res = await createCashier(data, dataUrl);
      toast.success(res.msg);
      resetForm();
      setDataUrl(null);
      closeModal()
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="w-full h-full mx-5">
      <Formik
        initialValues={initialValues}
        validationSchema={createCashierSchema}
        onSubmit={(values, { resetForm }) => {
          if (dataUrl) {
            onCreate(values, dataUrl, resetForm);
          } else {
            toast.error('Please select an avatar image.');
          }
        }}
      >
        {() => (
          <Form>
            <div className='flex flex-col space-y-44'>
              <div className=''>
                <Input name="username" type="string" placeholder="username" />
                <Input name="fullname" type="string" placeholder="fullname" />
                <Input name="password" type="password" placeholder="password" />
                <button
                  type="button"
                  className="bg-coffee py-2 px-6 rounded-full text-white "
                  onClick={() => setOpenModal(true)}
                >
                  Portrait
                </button>
              </div>
              <button type="submit" className="p-2 bg-coffee text-white rounded-full">
                Submit
              </button>
            </div>
            {openModal && (
              <PictureModal
                func={(imageDataUrl: string) => {
                  setDataUrl(imageDataUrl);
                  setOpenModal(false);
                }}
                closeModal={() => setOpenModal(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
