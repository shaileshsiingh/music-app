import React, { useState } from 'react';

function AddSong() {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [duration, setDuration] = useState('')
  const [songFile, setSongFile] = useState(null)
  const [uploadedSongs, setUploadedSongs] = useState([])
  const [searchedSong, setSearchedSong] = useState(null)
  const [error, setError] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value)
  };

  const handleAlbumChange = (event) => {
    setAlbum(event.target.value)
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value)
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSongFile(file)
  };

  const validateForm = () => {
    if (!title || !artist || !album || !duration || !songFile) {
      setError('All fields are required.')
      alert('All fields are required.')

      return false;
    }
    setError('');
    return true;
  };

  const handleUpload = () => {
    if (!validateForm()) return

  
    const uploadedSongDetails = {
      title: title,
      artist: artist,
      album: album,
      duration: duration,
      url: songFile ? URL.createObjectURL(songFile) : '',
    };
    setUploadedSongs([...uploadedSongs, uploadedSongDetails])
    setTitle('')
    setArtist('')
    setAlbum('')
    setDuration('')
    setSongFile(null)
  };

  const handleSearch = (query) => {
    //search logic
    const result = uploadedSongs.find(song => song.title.toLowerCase() === query.toLowerCase())
    setSearchedSong(result)
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto">
              <input className="form-control me-2" type="search" placeholder="Search by Title" aria-label="Search" onChange={(e) => handleSearch(e.target.value)} />
            </form>
          </div>
        </div>
      </nav>

      {searchedSong && (
        <div className="mt-3">
          <div className="card mb-3" style={{ width: '20rem' }}>
            <div className="card-body">
              <h5 className="card-title">{searchedSong.title}</h5>
              <p className="card-text">Artist: {searchedSong.artist}</p>
              <p className="card-text">Album: {searchedSong.album}</p>
              <p className="card-text">Duration: {searchedSong.duration}</p>
              <audio src={searchedSong.url} controls></audio>
            </div>
          </div>
        </div>
      )}
      <div className="mb-3">
        <h2>Add a New Song</h2>
        <label htmlFor="title" className="form-label">Title:</label>
        <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} style={{ width: '50%' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="artist" className="form-label">Artist:</label>
        <input type="text" className="form-control" id="artist" value={artist} onChange={handleArtistChange} style={{ width: '50%' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="album" className="form-label">Album:</label>
        <input type="text" className="form-control" id="album" value={album} onChange={handleAlbumChange} style={{ width: '50%' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="duration" className="form-label">Duration:</label>
        <input type="text" className="form-control" id="duration" value={duration} onChange={handleDurationChange} style={{ width: '50%' }} />
      </div>
      <div className="mb-3">
        <label htmlFor="file" className="form-label">File:</label>
        <input type="file" className="form-control" id="file" onChange={handleFileChange} accept="audio/*" style={{ width: '50%' }} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary mb-3" onClick={handleUpload}>Upload</button>
      <h2>Your Songs:</h2>

      <div className="row row-cols-auto justify-content-start">
        {uploadedSongs.map((song, index) => (
          <div key={index} className="col mb-3">
            <div className="card" style={{ width: '20rem' }}>
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>
                <p className="card-text">Artist: {song.artist}</p>
                <p className="card-text">Album: {song.album}</p>
                <p className="card-text">Duration: {song.duration}</p>
                <audio src={song.url} controls></audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddSong;
