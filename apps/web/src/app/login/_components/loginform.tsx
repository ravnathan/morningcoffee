import { Input } from '@/components/inputformik';
import { createCookie, navigate } from '@/libs/action/server';
import { userLogin } from '@/libs/action/user';
import { loginSchema } from '@/libs/schema';
import { UserLogin } from '@/types/user';
import { useUserStore } from '@/zustand/UserStore';
import { Form, Formik } from 'formik';
import { decode } from 'jsonwebtoken';
import { toast } from 'react-toastify';

interface LoginFormProps {
  setOpenModal: (open: boolean) => void
}

export default function LoginForm({ setOpenModal } : LoginFormProps) {
  const initialValues: UserLogin = {
    username: '',
    password: '',
  };

  const setRole = useUserStore((state) => state.setRole)

  const onLogin = async (data: UserLogin) => {
    try {
      const { result, ok } = await userLogin(data);
      if (!ok) throw result.msg;
      createCookie('token', result.token);
      const decodedToken = decode(result.token) as { role: string };
      if (decodedToken?.role) {
        setRole(decodedToken.role);
        if (decodedToken.role === 'cashier') {
          setOpenModal(true);
        }
      }

      if (decodedToken.role === 'admin') {
        toast.success(result.msg);
        navigate('/admin')
      }
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
          onSubmit={(values) => {
            onLogin(values);
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
