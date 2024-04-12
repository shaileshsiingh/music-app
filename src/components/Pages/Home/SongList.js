import React, { useState, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from "../../storeRedux/authReducer";
import { Link } from 'react-router-dom';

const LazyCard = lazy(() => import('./LazyCard')); // Lazy loading the Card component

function SongList() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.logout());
  }

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(
      ` https://v1.nocodeapi.com/shaileshsiingh/spotify/BLkUlnySvCMuedsY/search?q=${keyword === "" ? "trending" : keyword}&type=track`
    );
    let convertedData = await data.json();
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  };

 

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            v-music
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
        <div className={`row ${keyword === "" ? "trending" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <h1>Search your Song above</h1>
          </div>
        </div>
        <div className="row">
          <Suspense fallback={<div>Loading...</div>}>
            {tracks.map((element) => (
              <LazyCard key={element.id} track={element} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default SongList;
