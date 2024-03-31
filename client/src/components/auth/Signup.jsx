import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Signup.css'; 
import { Person2Rounded, EmailRounded, LockRounded } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password
      });
      
      console.log(response.data);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      alert("Error while signup");
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="form-wrapper sign-up">
          <form action="" onSubmit={submitHandler}>
            <h2>ToDo App</h2>
            <h2>Sign Up</h2>
            <div className="input-group">
            <div style={{marginRight:"6px",marginTop: '10px'}}>
              <Person2Rounded/>
              </div>
              <input type="text" required value={name} onChange={e=>setName(e.target.value)}/>
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
            <div style={{marginRight:"6px",marginTop: '10px'}}>
              <EmailRounded/>
              </div>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
            <div style={{marginRight:"6px",marginTop: '10px'}}>
              <LockRounded/>
              </div>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
              <label htmlFor="">Password</label>
            </div>
            <button type="submit" className="btn">Sign Up</button>
            {/* Link to sign-in form */}
            <div className="sign-link">
              <p>Already have an account? <Link to="/" className="signIn-link">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div> 
    </>
  );
};

export default Signup;