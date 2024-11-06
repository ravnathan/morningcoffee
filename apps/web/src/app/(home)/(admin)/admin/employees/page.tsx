import { boong } from '@/libs/fonts';
import EmployeeList from './_components/EmployeeList';
import CreateEmployee from './_components/CreateEmployee';

export default function Employees() {
  return (
    <div className="p-10">
      <div className='flex justify-between'>
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>
          Employee List
        </h1>
        <CreateEmployee/>
      </div>
      <EmployeeList/>
    </div>
  );
}
