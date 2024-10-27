import { ErrorMessage, Field } from 'formik';
import React from 'react';

interface InputProps {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ name, type, placeholder }) => {
  return (
    <div className="mb-4">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete='off'
        className="w-full px-0 py-2 border-b-2 border-white focus:outline-none focus:border-main bg-transparent text-white font-semibold placeholder:text-white placeholder:hover:text-transparent"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-700 text-sm font-semibold mt-1"
      />
    </div>
  );
};
