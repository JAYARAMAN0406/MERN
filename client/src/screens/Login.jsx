import React from 'react'
import Password from '../components/Password'
import TextFields from '../components/Textfield'
import { useForm } from 'react-hook-form';
import Buttons from '../components/Buttons';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { loginSuccess } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, LOGIN_URL, VERSION_URL } from '../utils/ApplicationUrl';
import Links from '../components/Links';
import Toastify from '../components/Toastify';

function Login() {

 const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });

 const dispatch = useDispatch();

 const navigate = useNavigate();

 const handleSubmits = async (data) => {
  console.log('Form submitted with:', data); 
  try {
   const res= await axios.post(`${BASE_URL}${VERSION_URL}${LOGIN_URL}`, data);
   console.log("res",res.data.token);
   if (res.status == 200){
   dispatch(
        loginSuccess({
          token: res.data.token
        })
      );
       navigate('/employee')
    }
  } catch (err) {
    Toastify.error(err.response.data.error);
  }
};

  return (
  <div className="bg-cover bg-center bg-fixed bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center text-sky-300">Login</h1>
            <form  onSubmit={handleSubmit(handleSubmits)}>
                <div className="mb-4">
                    <TextFields name="email" label="Email" control={control} rules={{ required: "Email is required" }} />
                </div>
                <div className="mb-4">
                    <Password
  label="Password"
  name="password"
  control={control}
  rules={{
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,16}$/,
      message:
        "Password must be 8–16 chars, include uppercase, lowercase, number & special char",
    },
  }}
/>    
    <div className="flex items-center justify-between text-sm mt-3">
  
     <Links to="/forgot-password">Forgot your password?</Links>
  
  <p className="text-gray-600">
    New User?{" "}
    <Links to="/register">
      Register
    </Links>
  </p>
</div>


                </div>
               <div className='mt-5 flex items-center justify-center'>
    <Buttons type='submit' label={"Submit"} />
    </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login