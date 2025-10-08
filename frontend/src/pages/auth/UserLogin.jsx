import React from 'react';
import '../../styles/form.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import user_login_img from '../../assets/images/user_login_img.png';

const UserLogin = () => {
const navigate = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    const response = await axios.post('http://localhost:3000/api/auth/user/login',{
      email,
      password
    },{
      withCredentials: true
    });

  console.log(response.data);
  navigate("/");
  }
  return (
  <div className="page-container">
    <div className='page-container-box'>
      <div className='image-box'>
          <img className="user-image" src={user_login_img} alt="" />
        </div>
    <form className="form-box simple-form" autoComplete="off" onSubmit={handdleSubmit}>
      <h2>User Login</h2>
      <div className="form-tagline">
        Welcome back! Sign in to continue discovering great food.
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" required />
      </div>
      <button type="submit" className="medium-btn">Login</button>
      <div className="form-footer">
        New user?
        <a href="/user/register">Register</a>
      </div>
    </form>
    </div>
    
  </div>
  );
}

export default UserLogin;