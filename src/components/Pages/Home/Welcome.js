import classes from './Welcome.module.css';
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from '../../storeRedux/authReducer';
import { Link } from 'react-router-dom';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';


const Welcome = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '16e86d8eb0mshaf370e064cdbbe9p18eb9ejsnf4f06d78d2a4',
          'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(`https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchQuery}`, requestOptions);
        const data = await response.json();
        setSongs(data.results.songs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const logoutHandler = () => {
    dispatch(authAction.logout());
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePlay = (songId) => {
    // Logic to play the song
  };

  const handlePause = (songId) => {
    // Logic to pause the song
  };

  const handleLike = (songId) => {
    // Logic to like the song and add it to Liked Songs page
  };

  const renderSongCards = () => {
    return songs.map(song => (
      <Card key={song.id}>
        <Card.Body>
          <Card.Title>{song.title}</Card.Title>
          <Card.Text>Artist: {song.artist}</Card.Text>
          <Card.Text>Album: {song.album}</Card.Text>
          <Card.Text>Duration: {song.duration}</Card.Text>
          <Button onClick={() => handlePlay(song.id)}>Play</Button>
          <Button onClick={() => handlePause(song.id)}>Pause</Button>
          <Button onClick={() => handleLike(song.id)}>Like</Button>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.header}>
          <div className={classes.welcome}>Welcome to Music Player</div>
          <div>
            <InputGroup>
              <FormControl
                placeholder="Search for songs"
                aria-label="Search for songs"
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={handleSearch}
              />
            </InputGroup>
            <Link to='/add-song' className={classes.link}>Add a Song</Link>
            <Link to='/play-songs' className={classes.link}>Play Songs</Link>
          </div>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      </div>
      <div className={classes.songList}>
        {renderSongCards()}
      </div>
    </Fragment>
  )
}

export default Welcome;
