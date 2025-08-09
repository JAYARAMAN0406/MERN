import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import Dates from '../../components/Date';
import Selects from '../../components/Select';
import Buttons from '../../components/Buttons';
import TextFields from '../../components/Textfield';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Toastify from '../../components/Toastify';
import { BASE_URL, EMPLOYEE_URL, VERSION_URL } from '../../utils/ApplicationUrl';

function EmployeeCreate() {

    const { token } = useSelector((state) => state.auth);

     const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    
    console.log(errors);

     const navigate=useNavigate();
    
     const handleSubmits = async (data) => {

  try {

 const res=   await axios.post(
      `${BASE_URL}${VERSION_URL}${EMPLOYEE_URL}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      Toastify.success(res.data.message)
     navigate('/employee')
  } catch (err) {
    console.error(err);
  Toastify.error(err.response.data.error);
  }
};


     const handleBack=()=>{
    navigate("/employee")
  }

  return (
    <div>
        <div className='mt-10 text-center text-red-500 text-4xl'>Employee Details</div>
        <div className='mr-16 float-end'>
        <Buttons label="Back" onClick={handleBack} />

    </div>
         <div className="mt-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleSubmits)}
        className=" w-full max-w-md"
      >
        <div >
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
        </div>

  )
}

export default EmployeeCreate