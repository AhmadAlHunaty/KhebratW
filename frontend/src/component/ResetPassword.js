import React, { useState } from 'react'
import './style.css'

const ResetPassword = () => {
    const [email, setEmail] = useState(null);

    const handleReset = () => {
        return;
    }

  return (
    <div className='reset-container'>
    <div className='reset-container-body'>
      <div class="card">
        <p class="lock-icon"><i class="fas fa-lock"> </i></p>
        <h2>Forgot Password?</h2>
        <p>You can reset your Password here</p>
        <input type="text" class="passInput" placeholder="Email address" onChange={(e) => setEmail(e?.target?.value)} />
        <button onClick={handleReset}>Send My Password</button>
       </div>
    </div>
    </div>
  )
}

export default ResetPassword
