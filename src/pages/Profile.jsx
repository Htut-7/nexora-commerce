import { useState } from 'react'
import '../css/Profile.css';
import useProfile from '../Hooks/useProfile';
import { auth } from '../firebase/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  
  const [oldPassword,setOldPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');

  const {loading,error,updateUser}=useProfile();

  const navigate=useNavigate();

  const saveProfile=async(e)=>{
    e.preventDefault();

    const success=await updateUser(
      oldPassword,
      newPassword
    );

    if(success){
      alert('Profile Updated');
      navigate('/');
    }
  };

  return (
    <form className='profile-form' onSubmit={saveProfile}>
      <div className='profile-container'>
        <h3>Edit Profile</h3>
        <p>Update your personal information, contact details, and account preferences to keep your Nexora Fashion profile up to date.</p>
      </div>

      {error && <p className='profile-error'>{error}</p>}

      <div className='profile-input'>
        <label>Username</label>
        <input type='text' placeholder='Enter your name'
       value={auth.currentUser?.displayName || ""} disabled
        />

        <label>Email</label>
        <input type='email' placeholder='Enter new  email'
        value={auth.currentUser?.email || ""} disabled
        />

        <label>Current Password</label>
        <input type='password' placeholder='Enter current password'
        onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword}
        />

        <label>Password</label>
        <input type='password' placeholder='Enter new Password'
        onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}
        />

        <div className='profile-btn'>
          <button type='save' disabled={loading}>
            {loading ? <span className='profile-spinner'></span> : 'Save'}
          </button>
        </div>
      </div>
    </form>
  )
}
