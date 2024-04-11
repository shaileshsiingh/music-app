import React, { useState } from 'react';

const AddSong = () => {
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    previewUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.spotify.com/v1/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: songDetails.title,
          artists: [{ name: songDetails.artist }],
          album: { name: songDetails.album },
          duration_ms: songDetails.duration * 1000, // Assuming duration is in seconds
          preview_url: songDetails.previewUrl
        })
      });
      
      if (response.ok) {
        // Song successfully added
        console.log('Song added successfully!');
        alert('Song added successfully!')
      } else {
        // Handle error
        console.error('Failed to add song:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding song:', error);
    }

    // Reset form fields after submission
    setSongDetails({
      title: '',
      artist: '',
      album: '',
      duration: '',
      previewUrl: ''
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add a Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={songDetails.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artist</label>
          <input type="text" className="form-control" id="artist" name="artist" value={songDetails.artist} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="album" className="form-label">Album</label>
          <input type="text" className="form-control" id="album" name="album" value={songDetails.album} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (seconds)</label>
          <input type="number" className="form-control" id="duration" name="duration" value={songDetails.duration} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="previewUrl" className="form-label">Preview URL</label>
          <input type="url" className="form-control" id="previewUrl" name="previewUrl" value={songDetails.previewUrl} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
