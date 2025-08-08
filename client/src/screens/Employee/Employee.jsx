import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import axios from 'axios';
import Buttons from '../../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { BASE_URL, EMPLOYEE_URL, VERSION_URL } from '../../utils/ApplicationUrl';
import Toastify from '../../components/Toastify';



function Employee() {

 const [users, setUsers] = useState([]);
 const navigate=useNavigate();
 const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${VERSION_URL}${EMPLOYEE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     
     const flatData = res.data.map(({ employee }) => ({
           id: employee.id,
          fullName: employee.fullName,
          email: employee.email,
          dob: employee.dob,
          gender: employee.gender,
          contact:employee.phone,
          createdBy: employee.createdByUser?.fullName || "N/A",
          creatorEmail: employee.createdByUser?.email || "N/A",
        }));

        setUsers(flatData);
    } catch (err) {
      Toastify.error("Error fetching Employee");
    }
  };
  fetchUsers();
}, []);


   const columns = [
    { label: "Employee Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Contact No.", key: "contact" },
    { label: "Created By", key: "createdBy" },
    { label: "Creator Email", key: "creatorEmail" },
    { label: "Actions", key: "actions" },
  ];

  const handleClick=()=>{
    navigate("/create")
  }

  const handleLogout=()=>{
    dispatch(
           logout({
             token: null
           })
         );
          navigate('/')
       }

  const handleUpdateClick=(row)=>{
      console.log(row.id);
    
 navigate(`/employeeupdate/${row.id}`)
  }

  const handleViewClick=(row)=>{
      console.log(row.id);
    
 navigate(`/employeeview/${row.id}`)
  }

  const handleDeleteClick=(row)=>{
      console.log(row.id);
    
 navigate(`/employeeview/${row.id}`,{
  state: { fromListPage: true }
 })
  }

  return (
    <div >
    <div className='mt-10 text-center text-red-500 text-4xl'>Employee</div>
    <div className='mr-16 float-end space-x-3'>
        <Buttons label="Create" onClick={handleClick} />
        <Buttons label="Log out" onClick={handleLogout} />
    </div>
   <div className="mt-10 flex flex-col items-center justify-center">
  <h2 className="text-lg font-semibold mb-4">Employee List</h2>
  <Table columns={columns} data={users}  onUpdate={(row) =>handleUpdateClick(row)}
  onDelete={(row)=>handleDeleteClick(row)} onView={(row)=>handleViewClick(row)}/>
</div>

</div>
  )
}

export default Employee