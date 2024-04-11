import { useState } from "react";
import { useDispatch } from 'react-redux';
import { authAction } from "../../storeRedux/authReducer";
import { Link } from 'react-router-dom';



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
    console.log(convertedData.tracks.items)
    setIsLoading(false);
  };

  const handleLike = (trackId) => {
    // Logic to like the song and add it to Liked Songs page
    console.log(`Liked song with ID ${trackId}`);
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
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img src={element.album.images[0].url} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0">Artist: {element.album.artists[0].name}</p>
                      <button onClick={() => handleLike(element.id)} className="btn btn-outline-primary">Like</button>
                    </div>
                    <p className="card-text">Release date: {element.album.release_date}</p>
                    <audio src={element.preview_url} controls className="w-100"></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SongList;
