import { Input } from '@/components/inputformik';
import { createCookie, navigate } from '@/libs/action/server';
import { userLogin } from '@/libs/action/user';
import { boong, spline } from '@/libs/fonts';
import { loginSchema } from '@/libs/schema';
import { UserLogin } from '@/types/user';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const initialValues: UserLogin = {
    username: '',
    password: '',
  };

  const onLogin = async (data: UserLogin, action: FormikHelpers<UserLogin>) => {
    try {
      const { result, ok } = await userLogin(data);
      if (!ok) throw result.msg;
      createCookie('token', result.token);
      navigate('/');
      toast.success(result.msg);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="flex items-center justify-center w-[500px]">
      <div className="p-8 rounded-lg w-full max-w-md mx-3">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values, action) => {
            onLogin(values, action);
          }}
        >
          {() => (
            <Form>
              <Input name="username" type="string" placeholder='Username' />
              <Input name="password" type="password" placeholder='Password' />
              <div className='pt-5'>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-white text-coffee font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Log In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
