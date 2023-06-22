import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toaster = () => {
  return (
    <div>Toaster</div>
  )
}

export const toasterSuccess = ()=>{
    return <ToastContainer
    position="top-center"
    autoClose={2100}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
}
export default Toaster
