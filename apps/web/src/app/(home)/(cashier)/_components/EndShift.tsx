import { Input } from '@/components/inputformikblack';
import { navigate } from '@/libs/action/server';
import { cashierShift, onLogout } from '@/libs/action/user';
import { spline } from '@/libs/fonts';
import { shiftStartSchema } from '@/libs/schema';
import { shiftInterface } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

interface EndShiftProps {
  closeModal: () => void;
}

export default function EndShift({ closeModal }: EndShiftProps) {
  const initialValues: shiftInterface = {
    shift: 'end',
    value: parseInt(''),
  };

  const onEndShift = async (data: shiftInterface) => {
    try {
      const res = await cashierShift(data);
      if (!res.ok) {
        toast.error(res.msg);
        return;
      }
      onLogout();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-20 w-full pt-5">
      <h1 className={`text-xl ${spline.className} font-semibold `}>Insert the current amount of cash</h1>
      <div className="p-8 rounded-lg w-full max-w-md mx-3">
        <Formik
          initialValues={initialValues}
          validationSchema={shiftStartSchema}
          onSubmit={(values) => {
            onEndShift(values);
          }}
        >
          {() => (
            <Form>
              <Input name="value" type="number" placeholder="Amount" />
              <div className="pt-5">
                <div className="flex gap-10">
                  <button
                    type="submit"
                    className="w-full bg-coffee text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Submit
                  </button>
                  <button
                    className="w-full bg-lightbrown text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
