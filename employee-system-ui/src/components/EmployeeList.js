//rafc to create component
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {

  // to navigate to different page's application
  const navigate = useNavigate();

  //checking if the data is loading or no
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  //retrieving data of all employees from the service
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id);
        });
      };
    });
  };

  return (

    // createing button Add Employee
    <div className='container mx-auto my-8'>
      <div className='h-12'>
        <button
          onClick={() => navigate("/addEmployee")}
          className='rouded bg-slate-600 text-white px-6 py-2 font-semibold '>Add Employee</button>
      </div>

      {/* Creating a table for the list of Employees */}
      <div className='flex shadow border-b'>
        <table className='min-w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>First Name</th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Last Name</th>
              <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Email</th>
              <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Actions</th>
            </tr>
          </thead>
          {/* First - verify if data was loaded */}
          {!loading && (
            <tbody className='bg-white'>
              {/* Second - we map employees */}
              {employees.map((employee) => (

                // passing object employee to the tag
                <Employee employee={employee} deleteEmployee={deleteEmployee} key={employee.id}></Employee>

              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>

  )
}

export default EmployeeList