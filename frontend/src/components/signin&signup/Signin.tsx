import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Signin.css';
import { EmailRounded, LockRounded } from '@mui/icons-material';
import axios from 'axios';
const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e:any)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin',{
        email,
        password
      });
      
      console.log(response.data);
      setEmail("");
      setPassword("");
      navigate("/signup");
    } catch (error:any) {
      alert("Error while login")
    }
  }
  return (
    <>
        <div className="form-wrapper sign-in">
          <form action="" onSubmit={submitHandler}>
            <h2>ToDo App</h2>
            <h2>Login</h2>
            <div className="input-group">
            <div style={{marginRight:"6px",marginTop: '10px'}}>
              <EmailRounded/>
              </div>
              <input type="text" required value={email} onChange={e=>setEmail(e.target.value)}/>
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
            <div style={{marginRight:"6px",marginTop: '10px'}}>
              <LockRounded/>
              </div>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/ >
              <label htmlFor="">Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">Login</button>
            {/* Link to sign-up form */}
            <div className="sign-link">
              <p>Don't have an account? <Link to="/signup" className="signUp-link">Sign Up</Link></p>
            </div>
          </form>
        </div>
    </>
  );
};

export default Signin;
