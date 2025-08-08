import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dates from '../../components/Date';
import Selects from '../../components/Select';
import Buttons from '../../components/Buttons';
import TextFields from '../../components/Textfield';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { BASE_URL, EMPLOYEE_URL, VERSION_URL } from '../../utils/ApplicationUrl';
import Toastify from '../../components/Toastify';

function EmployeeUpdate() {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset, 
    formState: { errors }
  } = useForm({ mode: 'onTouched' });

  console.log(errors);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${VERSION_URL}${EMPLOYEE_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const employeeData = res.data;

        console.log(res.data);
        
       
        reset({
          firstName: employeeData.firstName || '',
          lastName: employeeData.lastName || '',
          email: employeeData.email || '',
          phone: employeeData.phone || '',
          dob: employeeData.dob ? dayjs(employeeData.dob) : null,
          gender: employeeData.gender || '',
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUsers();
  }, [id, reset, token]);

  const handleSubmits = async (data) => {
    console.log('Form submitted with:', data);

    try {
   const res=   await axios.put( 
        `${BASE_URL}${VERSION_URL}${EMPLOYEE_URL}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log("res",res);
  Toastify.success(res.data.message)
      navigate("/employee");
    } catch (err) {
      console.error(err);
     Toastify.error(err.response.data.error);
    }
  };

  const handleBack = () => {
    navigate("/employee");
  };

  return (
    <div>
      <div className='mt-10 text-center text-red-500 text-4xl'>Update Employee Details</div>
      <div className='mr-16 float-end'>
        <Buttons label="Back" onClick={handleBack} />
      </div>

      <div className="mt-10 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(handleSubmits)}
          className="w-full max-w-md"
        >
          <TextFields name="firstName" label="First Name" control={control} rules={{ required: "First Name is required" }} />

          <div className='mt-3'>
            <TextFields name="lastName" label="Last Name" control={control} rules={{ required: "Last Name is required" }} />
          </div>

          <div className='mt-3'>
            <TextFields name="email" label="Email" control={control} rules={{ required: "Email is required" }} />
          </div>

          <div className='mt-3'>
            <TextFields name="phone" label="Phone" control={control} rules={{ required: "Phone is required" }} />
          </div>

          <div className='mt-3'>
            <Dates name="dob" label="Date of Birth" control={control} defaultValue={null} rules={{ required: "Date of Birth is required" }} />
          </div>

          <div className='mt-3'>
            <Selects
              name="gender"
              label="Gender"
              control={control}
              rules={{ required: "Gender is required" }}
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' }
              ]}
            />
          </div>

          <div className='mt-5 flex items-center justify-center'>
            <Buttons type='submit' label={"Update"} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeUpdate;
