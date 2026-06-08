import "../Css/Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignUp from "../Hooks/useSignUp";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const {loading,error,signUp}=useSignUp();

    const regUser=async(e)=>{
        e.preventDefault();
        let user=await signUp(name,email,password);

        if(user){
            navigate('/login');
        }
    }


  return (
    <form className="reg-form" onSubmit={regUser}>
        <div className="reg-container">
            <h2>Welcome to Nexora</h2>
            <p>Discover modern fashion designed for your style.</p>

            {error && <p className="reg-error">{error}</p>}

            <div className="reg-input">
                <label>Username</label>
                <input type="text" placeholder="Enter username" onChange={(e)=>setName(e.target.value)} value={name}/>

                <label>Email</label>
                <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <div className="reg-action">
                    <Link to='/login'>Already have an account?</Link>
                </div>

                <div className="reg-btn">
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="reg-spinner"></span> : "Register"}
                    </button>
                </div>
            </div>
        </div>
    </form>
  )
}
