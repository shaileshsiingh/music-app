import React, { useState } from 'react';

function AddSong() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [uploadedSong, setUploadedSong] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleAlbumChange = (event) => {
    setAlbum(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSongFile(file);
  };

  const handleUpload = () => {
    // Handle the upload logic here, e.g., upload the song file to a server
    // For demonstration, setting the uploaded song details directly
    const uploadedSongDetails = {
      title: title,
      artist: artist,
      album: album,
      duration: duration,
      // Set the URL of the uploaded song, if available
      url: songFile ? URL.createObjectURL(songFile) : '',
    };
    setUploadedSong(uploadedSongDetails);
  };

  return (
    <div className="container">
      <h2>Add Song</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="artist" className="form-label">Artist:</label>
        <input type="text" className="form-control" id="artist" value={artist} onChange={handleArtistChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="album" className="form-label">Album:</label>
        <input type="text" className="form-control" id="album" value={album} onChange={handleAlbumChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="duration" className="form-label">Duration:</label>
        <input type="text" className="form-control" id="duration" value={duration} onChange={handleDurationChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">File:</label>
        <input type="file" className="form-control" id="file" onChange={handleFileChange} accept="audio/*" />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
      {uploadedSong && (
        <div>
          <h3>{uploadedSong.title}</h3>
          <p>Artist: {uploadedSong.artist}</p>
          <p>Album: {uploadedSong.album}</p>
          <p>Duration: {uploadedSong.duration}</p>
          <audio src={uploadedSong.url} controls></audio>
        </div>
      )}
    </div>
  );
}

export default AddSong;
