import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/CreateFood.css';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate =useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    setVideoFileName(file ? file.name : '');
  };

  const triggerFileInput = () => {
    document.getElementById('video').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', foodName);
      formData.append('description', description);
      formData.append('video', video);

      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        { withCredentials: true }
      );

      setMessage("Food item added successfully!");
      setFoodName('');
      setDescription('');
      setVideo(null);
      setVideoFileName('');

      console.log(response.data);

      navigate('/');

    } catch (error) {
      setMessage("Failed to upload. Try again!");
      console.error(error);
    }
    
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <h2>Add Food Item</h2>

        {message && <p className="msg">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="video">Upload Video</label>
            <div className="upload-area" onClick={triggerFileInput}>
              <p>Click to upload video</p>
              {videoFileName && <p className="file-name">Selected: {videoFileName}</p>}
            </div>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
              required
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="foodName">Food Name</label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button type="submit" className="medium-btn" disabled={loading}>
            {loading ? "Uploading..." : "Add Food Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
