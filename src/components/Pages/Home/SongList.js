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
      url = 'https://v1.nocodeapi.com/shaileshsiingh/spotify/BLkUlnySvCMuedsY/search?q=trending&type=track';
    } else {
      // Fetch songs based on the search keyword
      url = `https://v1.nocodeapi.com/shaileshsiingh/spotify/BLkUlnySvCMuedsY/search?q=${keyword}&type=track`;
    }
    let data = await fetch(url);
    let convertedData = await data.json();
    if (keyword === "") {
      setTrendingTracks(convertedData.tracks.items);
    } else {
      setTracks(convertedData.tracks.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTracks();
  }, []); // Fetch trending songs on initial render

 

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MVC music
          </Link>

          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">Search</button>
            <button onClick={logoutHandler} className="btn btn-outline-success">Logout</button>
            <Link to="/add-songs" className="btn btn-outline-success">Add song</Link>
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
              <LazyCard key={element.id} track={element}  />
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