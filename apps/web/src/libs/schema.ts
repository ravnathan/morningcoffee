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

export const createProduct = Yup.object({
  name: Yup.string().required('Name is required'),
  
})

export const createCategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Category Name is required'),
  coldVariant: Yup.boolean(), 
  selectedSize: Yup.string()
    .oneOf(['Small', 'Medium', 'Large'], 'Invalid size selected')
    .required('Size is required'),
  image: Yup.mixed()
    .required('Image is required'),
});

export const createCashierSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  fullname: Yup.string().required('Fullname is required'),
  password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
      .matches(/[a-z]/, 'Password must include at least one lowercase letter')
      .matches(/\d/, 'Password must include at least one number')
      .matches(
        /[!@#$%^&*]/,
        'Password must include at least one special character from !@#$%^&*',
      ).required('Password is required'), 
  // image: Yup.mixed().required('Image is required')
})