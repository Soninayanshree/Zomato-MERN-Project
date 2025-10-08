import React from "react";
import "../../styles/form.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import foodpartner_reg_img from '../../assets/images/user_registeration_img.png';

const FoodPartnerRegister = () => {
 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;
    console.log(name, email, phone, address, password);

    const response = await axios.post('http://localhost:3000/api/auth/food-partner/register',{
      name,
      email,
      contact: phone,
      address,
      password
    },{
      withCredentials: true
    }
    );

  console.log(response.data);
  navigate("/create-food");

  };
  return (
  <div className="page-container">
    <div className="page-container-box .fp_reg_img_box">
      <div className="image-box ">
        <img className="user-image" src={foodpartner_reg_img} alt="" />
      </div>
      <form className="form-box simple-form" autoComplete="off" onSubmit={handleSubmit}>
        <h2>Food Partner Register</h2>
        <div className="form-divider"></div>
        <div className="form-tagline">
          Join our network and grow your restaurant business.
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Contact Number</label>
          <input id="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit" className="medium-btn">
          Register
        </button>
        <div className="form-footer">
          Already a partner?
          <a href="/food-partner/login">Login</a>
          <br />
          <span style={{ color: "#708993" }}>Or register as:</span>
          <a href="/user/register"> Normal User</a>
          <span> | </span>
          <a href="/food-partner/register"> Food Partner</a>
        </div>
      </form>
    </div>
  </div>
  );
};

export default FoodPartnerRegister;
