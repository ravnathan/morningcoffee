import { Input } from '@/components/inputformikblack'
import { editCashierDataFullname } from '@/libs/action/admin';
import { fullNameSchema } from '@/libs/schema';
import { CashierFullname } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

interface EditNameProps {
    editFullname: string
    setOpenModal: () => void
}

export default function EditFullname({editFullname, setOpenModal} : EditNameProps) {
  const initialValues: CashierFullname = {
    fullname: ''
  };
  const onFullNameChange = async (data: CashierFullname) => {
    try {
      const res = await editCashierDataFullname(editFullname, data);
      toast.success(res.msg);
    } catch (error) {
      toast.error('Failed to change data');
    }
  };

  return (
      <Formik initialValues={initialValues} validationSchema={fullNameSchema} onSubmit={(values) => onFullNameChange(values)}>
        {() => (
          <Form>
            <div className='flex flex-col justify-center items-center w-full'>
              <Input name="fullname" type="text" />
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="w-24 bg-coffee text-white font-semibold py-2 px-4 mb-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-24 bg-superlightbrown text-main font-bold py-2 px-4 mb-3 rounded-lg border-2 border-main transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={setOpenModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
  );
}
