'use client';

import { useState } from 'react';
import EmployeeModal from './employeemodal';
import EmployeeForm from './employeeform';

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
        <EmployeeModal
          children={<EmployeeForm closeModal={() => setEmployeeModal(false)} />}
          closeModal={() => setEmployeeModal(false)}
        />
      )}
    </div>
  );
}
