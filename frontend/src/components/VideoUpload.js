// src/components/VideoUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', file.name);
  
    try {
      const response = await axios.post('http://localhost:8000/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading video');
    }
  };
  

  return (
    <div style={style.container}>
      <input type="file" onChange={handleFileChange} style={style.input} />
      <button onClick={handleUpload} style={style.button}>Upload Video</button>
      {message && <div style={style.message}>{message}</div>}
      <Link to="/videos" style={style.link}>View All Videos</Link>
    </div>
  );
}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  input: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    color: '#008000',
    textAlign: 'center',
    padding: '10px',
    marginTop: '10px',
  },
  link: {
    color: '#0000EE',
    textDecoration: 'none',
    marginTop: '15px',
  }
};

export default VideoUpload;
