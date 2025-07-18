import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Dates from '../components/Date';
import TextFields from '../components/Textfield';
import Selects from '../components/Select';
import Buttons from '../components/Buttons';

const UserForm = () => {
 const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

console.log(errors);

 const handleSubmits = async (data) => {
  console.log('Form submitted with:', data); 
  try {
    await axios.post('http://localhost:5000/api/users', data);
    alert('User saved successfully!');
  } catch (err) {
    console.error(err);
    alert('Error saving user');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 w-50">
      <form
        onSubmit={handleSubmit(handleSubmits)}
        className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md animate-fade-in"
      >
        <h3 className="text-center justify-center text-2xl font-bold">User Details</h3>
        <div className='mt-3'>
        <TextFields name="firstName" label="First Name" control={control} rules={{ required: "First Name is required" }} />
        </div>
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
    <Buttons type='submit' label={"Submit"} />
    </div>
      </form>
    </div>
  );
};

export default UserForm;
