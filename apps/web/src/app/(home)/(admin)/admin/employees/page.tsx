import { boong } from '@/libs/fonts';
import EmployeeList from './_components/employeelist';
import CreateEmployee from './_components/createemployee';

export default function Employees() {
  return (
    <div className="p-10">
      <div className='flex justify-between'>
        <h1 className={`text-7xl ${boong.className} text-coffee pb-10`}>
          Products
        </h1>
        <CreateEmployee/>
      </div>
    </div>
  );
}
