import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    theme: 'colored'
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    theme: 'colored'
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: 'bottom-right',
    autoClose: 3000,
    theme: 'colored'
  });
};