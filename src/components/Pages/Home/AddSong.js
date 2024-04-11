// src/home/AddSong.js
import React from 'react';

const AddSong = () => {
  return (
    <div>
      <h2>Add Song</h2>
      {/* Form for adding songs */}
      <form>
        {/* Input fields for song details */}
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Artist" />
        <input type="text" placeholder="Album" />
        <input type="text" placeholder="Duration" />
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
