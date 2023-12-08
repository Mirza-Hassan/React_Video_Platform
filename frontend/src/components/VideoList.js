// src/components/VideoList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/videos');
      setVideos(response.data);
    } catch (error) {
      setMessage('Error fetching videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/videos/${videoId}`);
      fetchVideos(); 
      setMessage('Video deleted successfully!');
    } catch (error) {
      setMessage('Error deleting video');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
        {message && <div style={style.message}>{message}</div>}
        {videos.length > 0 ? (
          videos.map((video) => (
          <div key={video.id} style={style.video}>
              <video width="320" height="240" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={() => handleDelete(video.id)} style={style.deleteButton}>Delete Video</button>
            </div>      
            ))
        ) : (
          <div style={style.noVideos}>No videos in the list</div>
        )}
        <button onClick={handleBack} style={style.backButton}>Back</button>
      </div>  
    );
}

const style = {
  video: {
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textAlign: 'center',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#ff6347',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'block',
    margin: '10px auto',
  },
  backButton: {
    padding: '5px 10px',
    backgroundColor: '#000000',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'block',
    margin: '10px auto',
  },
  message: {
    color: '#ff0000',
    textAlign: 'center',
    padding: '10px',
    marginBottom: '10px',
  },
  noVideos: {
    color: '#ff0000',
    textAlign: 'center',
    padding: '10px',
    marginBottom: '10px',
  },
}

export default VideoList;
