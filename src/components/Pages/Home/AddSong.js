import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AddSong() {
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    url: '',
  });

  const [submittedSongs, setSubmittedSongs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSong({ ...newSong, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save new song to state or API
    console.log('New song added:', newSong);
    setSubmittedSongs([...submittedSongs, newSong]);
    // Clear the form fields
    setNewSong({
      title: '',
      artist: '',
      album: '',
      duration: '',
      url: '',
    });
  };

  return (
    <div>
      <h2>Add New Song</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newSong.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formArtist">
          <Form.Label>Artist:</Form.Label>
          <Form.Control
            type="text"
            name="artist"
            value={newSong.artist}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formAlbum">
          <Form.Label>Album:</Form.Label>
          <Form.Control
            type="text"
            name="album"
            value={newSong.album}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDuration">
          <Form.Label>Duration:</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            value={newSong.duration}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formUrl">
          <Form.Label>Song URL:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={newSong.url}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Song
        </Button>
      </Form>
      {/* Display submitted songs */}
      {submittedSongs.length > 0 && (
        <div>
          <h3>Submitted Songs</h3>
          <ul>
            {submittedSongs.map((song, index) => (
              <li key={index}>
                <p>Title: {song.title}</p>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Duration: {song.duration}</p>
                <p>Song URL: {song.url}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AddSong;
