import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DetailRow from "../../components/DetailRow";
import Buttons from "../../components/Buttons";
import { BASE_URL, EMPLOYEE_URL, EMPLOYEE_VIEW_URL, VERSION_URL } from "../../utils/ApplicationUrl";
import Toastify from "../../components/Toastify";

const EmployeeView = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [employeeData, setEmployeeData] = useState(null);
  const [createdByUser, setCreatedByUser] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${VERSION_URL}${EMPLOYEE_VIEW_URL}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployeeData(res.data.employee);
        setCreatedByUser(res.data.createdByUser);
      } catch (err) {
        Toastify.error(err.response.data.error);
      }
    };

    fetchEmployee();
  }, [id, token]);

    const handleSubmits = async (data) => {
    console.log('Form submitted with:', data);

    try {
      await axios.delete( 
        `${BASE_URL}${VERSION_URL}${EMPLOYEE_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  if (!employeeData) return <div className="p-5">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <div className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Employee Details
      </div>
 <div className='mr-16 float-end space-x-3'>
        <Buttons label="Back" onClick={handleBack} />
    </div>
      <div className="bg-gray-50 p-4 rounded mb-6">
        <DetailRow label="Full Name" value={employeeData.fullName} />
        <DetailRow label="Email" value={employeeData.email} />
        <DetailRow label="Phone" value={employeeData.phone} />
        <DetailRow label="Gender" value={employeeData.gender} />
        <DetailRow label="Date of Birth" value={employeeData.dob} />
      </div>

      <div className="text-xl font-semibold mb-3 text-indigo-500">Created By</div>
      <div className="bg-gray-50 p-4 rounded">
        <DetailRow label="Name" value={createdByUser?.fullName} />
        <DetailRow label="Email" value={createdByUser?.email} />
        <DetailRow label="Gender" value={createdByUser?.gender} />
      </div>

{state?.fromListPage && (
      <div className="text-center">
          <Buttons label="Delete" color="error" onClick={handleSubmits} />
      </div>
)}
    </div>
  );
};

export default EmployeeView;
