import * as Yup from 'yup'

export const loginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
      .matches(/[a-z]/, 'Password must include at least one lowercase letter')
      .matches(/\d/, 'Password must include at least one number')
      .matches(
        /[!@#$%^&*]/,
        'Password must include at least one special character from !@#$%^&*',
      ).required('Password is required'),
  });