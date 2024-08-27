import { toast, Slide } from 'react-toastify'
const toastId = 'fetched-nationalities'
const ToastSuccess = {
  autoClose: 3000, //3 seconds
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  toastId,
  transition: Slide
}

export default ToastSuccess
