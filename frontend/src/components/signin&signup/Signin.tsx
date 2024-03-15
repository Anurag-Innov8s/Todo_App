import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Signin.css';

const Signin: React.FC = () => {
  return (
    <>
        <div className="form-wrapper sign-in">
          <form action="">
            <h2>ToDo App</h2>
            <h2>Login</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
              <input type="password" required />
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
