import React, { useState } from 'react'
import './style.css'
import Auth from "../api/Auth";
import {toast} from "react-toastify";

const ChangePassword = () => {
    const [email, setEmail] = useState(null);

    const handleReset = (e) => {
        e.preventDefault()
        console.log(e.target)
        const params = new URLSearchParams(new URL(window.location.href).search);
const token = params.get('token');
const email = params.get('email');
      console.log(email,token) 
        Auth.resetPassword(
            {
                'email':email,
                'token':token,
                'password':e.target.password.value,
                'password_confimation':e.target.password_confirmation.value
            }
        ).then((res)=>{
            console.log(res);
            toast.success('Password change Successfull')
        })
    }

  return (
    <div className='reset-container'>
    <form onSubmit={handleReset}  className='reset-container-body'>
      <div class="card">
        <p class="lock-icon"><i class="fas fa-lock"> </i></p>
        <h2>Set Your New Passowrd</h2>
        <p>Enter New Password</p>
        <input type="password" name='password' class="passInput" placeholder="new password" />
        <p>Re Enter New Password</p>
        <input type="password" name='password_confirmation' class="passInput" placeholder="new password confirmation" />
        <button type='submit'>Reset My Password</button>
       </div>
    </form>
    </div>
  )
}

export default ChangePassword
