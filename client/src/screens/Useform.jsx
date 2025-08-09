import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Dates from '../components/Date';
import TextFields from '../components/Textfield';
import Selects from '../components/Select';
import Buttons from '../components/Buttons';
import Password from '../components/Password';
import { BASE_URL, REGISTER_URL, VERSION_URL } from '../utils/ApplicationUrl';
import Links from '../components/Links';
import Toastify from '../components/Toastify';
import { DOB_REUIRED, EMAIL_REUIRED, FIRST_NAME_REUIRED, GENDER_REQUIRED, LAST_NAME_REUIRED, PASSWORD_CHAR, PASSWORD_REUIRED, PHONE_REUIRED } from '../utils/Validate';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
 const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

const navigate=useNavigate();
 
console.log(errors);

 const handleSubmits = async (data) => {
  try {
   const res= await axios.post(`${BASE_URL}${VERSION_URL}${REGISTER_URL}`, data);
    Toastify.success(res.data.message)
    navigate('/')
  } catch (err) {
    console.error(err);
    Toastify.error(err.response.data.error);
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
        <TextFields name="firstName" label="First Name" control={control} rules={{ required: `${FIRST_NAME_REUIRED}` }} />
        </div>
        <div className='mt-3'>
        <TextFields name="lastName" label="Last Name" control={control} rules={{ required: `${LAST_NAME_REUIRED}` }} />
        </div>
        <div className='mt-3'>
        <TextFields name="email" label="Email" control={control} rules={{ required: `${EMAIL_REUIRED}` }} />
        </div>
         <div className='mt-3'>
     <Password
  label="Password"
  name="password"
  control={control}
  rules={{
    required: `${PASSWORD_REUIRED}`,
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/,
      message:
        `${PASSWORD_CHAR}`,
    },
  }}
/>

    </div>
        <div className='mt-3'>
        <TextFields name="phone" label="Phone" control={control} rules={{ required: `${PHONE_REUIRED}` }} />
        </div>
       <div className='mt-3'>
        <Dates name="dob" label="Date of Birth" control={control} defaultValue={null} rules={{ required: `${DOB_REUIRED}` }} />
        </div>
        <div className='mt-3'>
        <Selects
          name="gender"
          label="Gender"
          control={control}
          rules={{ required: `${GENDER_REQUIRED}` }}
          options={[
            { label: 'Male', value: 'MALE' },
            { label: 'Female', value: 'FEMALE' }
          ]}
        />
        </div>
        <div className='mt-5 flex items-center justify-center'>
    <Buttons type='submit' label={"Submit"} />
    </div>
    <div className='text-center mt-3'>
       <p className="text-gray-600">
    Already Register User?{" "}
       <Links to="/">
      Login
    </Links>
  </p>
    </div>
      </form>
    </div>
  );
};

export default UserForm;
