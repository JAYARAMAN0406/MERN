import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastify = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
    });
  },

  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
    });
  },

  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
    });
  },

  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
    });
  },
};

export default Toastify;
