import * as Yup from 'yup';

export const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(/[!@#$%^&*]/, 'Password must include at least one special character from !@#$%^&*')
    .required('Password is required'),
});

export const createProductSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name must be at least 6 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces'),
  description: Yup.string()
    .max(50, 'Description must be at most 50 characters')
    .matches(/^[A-Za-z\s]*$/, 'Description must contain only alphabets and spaces'),
  stock: Yup.number().required('Must enter stock amount'),
});

export const createCategorySchema = Yup.object().shape({
  name: Yup.string().required('Category Name is required'),
  coldVariant: Yup.boolean(),
  selectedSize: Yup.string().oneOf(['Small', 'Medium', 'Large'], 'Invalid size selected').required('Size is required'),
  image: Yup.mixed().required('Image is required'),
});

export const createCashierSchema = Yup.object({
  fullname: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Full name can only contain alphabets and spaces')
    .min(6, 'Full name must be at least 6 characters')
    .required('Full name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/\d/, 'Password must include at least one number')
    .matches(/[!@#$%^&*]/, 'Password must include at least one special character from !@#$%^&*')
    .required('Password is required'),
});

export const debitCardSchema = Yup.object().shape({
  debitInfo: Yup.string()
    .required('Debit card information is required')
    .matches(/^\d{16}$/, 'Debit card must be 16 digits long'),
});

export const shiftStartSchema = Yup.object().shape({
  value: Yup.number().typeError('Value must be a number').min(0, 'Value cannot be negative').required('Value is required'),
});

export const fullNameSchema = Yup.object({
  fullname: Yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Full name can only contain alphabets and spaces')
  .min(6, 'Full name must be at least 6 characters')
  .required('Full name is required'),
})