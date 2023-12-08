import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';

function App() {
  return (
    <Router>
      <div>
        <header style={styles.header}>
          <h1>My Video Platform</h1>
        </header>
        <Routes>
          <Route path="/" element={<VideoUpload />} />
          <Route path="/videos" element={<VideoList />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  header: {
    backgroundColor: '#f8f8f8',
    padding: '10px 20px',
    textAlign: 'center',
  },
};

export default App;
