import React, { useState } from 'react';
import UserForm from './screens/Useform';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Employee from './screens/Employee/Employee';
import EmployeeCreate from './screens/Employee/EmployeeCreate';
import EmployeeUpdate from './screens/Employee/EmployeeUpdate';
import EmployeeView from './screens/Employee/EmployeeView';
import { ToastContainer } from 'react-toastify';


function App() {
const { token } = useSelector((state) => state.auth);


  return (
    <div className="min-h-screen bg-gray-50">
   
   {token == null && (
<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<UserForm />} />
         </Routes>
   )}

    {token != null && (
<Routes>
        <Route path="/employee" element={<Employee />} />
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/employeeupdate/:id" element={<EmployeeUpdate/>} />
        <Route path="/employeeview/:id" element={<EmployeeView/>} />
         </Routes>
   )}

 <ToastContainer />
     
    </div>
  );
}

export default App;