// src/home/PlaySongs.js
import React from 'react';
import PlaybackControls from './Welcome';

const PlaySongs = () => {
  return (
    <div>
      <h2>Now Playing</h2>
      {/* Song playback component */}
      <PlaybackControls />
    </div>
  );
};

export default PlaySongs;
