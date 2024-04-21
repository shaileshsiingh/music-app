import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from "../../storeRedux/authReducer";
import { Link } from 'react-router-dom';

const LazyCard = lazy(() => import('./LazyCard')); // Lazy loading the Card component

function SongList() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [trendingTracks, setTrendingTracks] = useState([]);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.logout());
  }

  const getTracks = async () => {
    setIsLoading(true);
    let url;
    if (keyword === "") {
      // Fetch trending songs
      url = 'https://v1.nocodeapi.com/shaipatel/spotify/YjfOJINRVKDQdtCs/search?q=trending&type=track';
    } else {
      // Fetch songs based on the search keyword
      url = `https://v1.nocodeapi.com/shaipatel/spotify/YjfOJINRVKDQdtCs/search?q=${keyword}&type=track`;
    }
    let data = await fetch(url);
    let convertedData = await data.json();
    if (convertedData && convertedData.tracks) {
      if (keyword === "") {
        setTrendingTracks(convertedData.tracks.items || []);
      } else {
        setTracks(convertedData.tracks.items || []);
      }
    }
    setIsLoading(false);
  };


  useEffect(() => {
    getTracks();
    // eslint-disable-next-line
  }, []); // Fetch trending songs on initial render



  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MVC music
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="d-flex">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button onClick={getTracks} className="btn btn-outline-success me-2">Search</button>
            </div>
            <div className="d-flex">
              <button onClick={logoutHandler} className="btn btn-outline-success me-2">Logout</button>
              <Link to="/add-songs" className="btn btn-outline-success">Add song</Link>
            </div>
          </div>
        </div>
      </nav>


      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className={`row ${keyword === "" ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <h1>Trending Songs</h1>
          </div>
          <div className="row">
            {trendingTracks.map((element) => (
              <LazyCard key={element.id} track={element} />
            ))}
          </div>
        </div>
        <div className={`row ${keyword === "" ? "d-none" : ""}`}>
          <div className="col-12 py-5 text-center">
            <h1>Search Results</h1>
          </div>
          <div className="row">
            <Suspense fallback={<div>Loading...</div>}>
              {tracks.map((element) => (
                <LazyCard key={element.id} track={element} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongList;