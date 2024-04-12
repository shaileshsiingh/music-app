import React from 'react';

const LazyCard = ({ track }) => {
  return (
    <div className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <img src={track.album.images[0].url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{track.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text mb-0">Artist: {track.album.artists[0].name}</p>

          </div>
          <p className="card-text">Album: {track.album.name}</p>
          <audio src={track.preview_url} controls className="w-100"></audio>
        </div>
      </div>
    </div>
  );
}

export default LazyCard;
