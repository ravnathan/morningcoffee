'use client';

import { useState } from 'react';
import EmployeeModal from './editingdata/EmployeeModal';
import AppWrapper from '../../products/_components/ProductWrapper';
import EmployeeForm from './EmployeeForm';
import CreateEmployeeModal from './CreateEmployeeModal';

export default function CreateEmployee() {
  const [employeeModal, setEmployeeModal] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 justify-center p-6">
      <div className="flex space-x-4">
        <button
          className="bg-coffee text-white font-semibold py-2 px-4 rounded-lg transform transition-transform duration-300 hover:scale-105"
          onClick={() => setEmployeeModal(true)}
        >
          Create Cashier
        </button>
      </div>
      {employeeModal && (
        <CreateEmployeeModal
          children={
            <AppWrapper>
              <EmployeeForm closeModal={() => setEmployeeModal(false)} />
            </AppWrapper>
          }
          closeModal={() => setEmployeeModal(false)}
        />
      )}
    </div>
  );
}
