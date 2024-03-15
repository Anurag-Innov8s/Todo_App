import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Signin.css';

const Signin: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <div className="form-wrapper sign-up">
          <form action="">
            <h2>ToDo App</h2>
            <h2>Sign Up</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
              <input type="email" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label htmlFor="">Password</label>
            </div>
            <button type="submit" className="btn">Sign Up</button>
            {/* Link to sign-in form */}
            <div className="sign-link">
              <p>Already have an account? <Link to="/signin" className="signIn-link">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
