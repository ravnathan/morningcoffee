import { Input } from '@/components/inputformikblack';
import { navigate } from '@/libs/action/server';
import { cashierShift, onLogout} from '@/libs/action/user';
import { spline } from '@/libs/fonts';
import { shiftStartSchema } from '@/libs/schema';
import { shiftInterface } from '@/types/user';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

export default function StartShift() {
  const initialValues: shiftInterface = {
    shift: 'start',
    value: parseInt(''),
  };

  const onStartShift = async (data: shiftInterface) => {
    try {
      const res = await cashierShift(data);
      toast.success(res.msg);
      navigate('/');
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
            onStartShift(values);
          }}
        >
          {() => (
            <Form>
              <Input name="value" type="number" placeholder="Amount" />
              <div className="pt-5">
                <div className='flex gap-10'>
                  <button
                    type="submit"
                    className="w-full bg-coffee text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Submit
                  </button>
                  <button
                  onClick={onLogout}
                    className="w-full bg-lightbrown text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
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
