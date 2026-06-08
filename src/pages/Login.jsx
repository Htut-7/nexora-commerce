import "../css/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignIn from "../Hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const {loading,error,signIn}=useSignIn();

    const logUser=async(e)=>{
        e.preventDefault();
        let user=await signIn(email,password);

        if(user){
            navigate('/');
        }
    }

  return (
   <form className="login-form" onSubmit={logUser}>
        <div className="login-container">
            <h2>Welcome Back</h2>
            <p>Sign in to continue shopping with Nexora.</p>

            {error && <p className="login-error">{error}</p>}

            <div className="login-input">
                <label>Email</label>
                <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>

                <label>Password</label>
                <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password}/>

                <div className="login-action">
                    <Link to='/register'>Don't have an account?</Link>
                </div>

                <div className="login-btn">
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="login-spinner"></span> : "Login"}
                    </button>
                </div>
            </div>
        </div>
   </form>
  )
}
