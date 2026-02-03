import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
        console.log(response);
      });
  }, [id]);
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic">
            <img src="" alt="" />
          </div>
          <div className="profile-info">
            <h3>{profile?.name}</h3>
            <p>{profile?.address}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div>
            <p className="label">total meals</p>
            <h4>43</h4>
          </div>
          <div>
            <p className="label">customer serve</p>
            <h4>15K</h4>
          </div>
        </div>
      </div>
      <div className="profile-video-grid">
        {videos.map((v) => (
          <div key={v.id} className="profile-video">
            <video src={v.video} muted/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
