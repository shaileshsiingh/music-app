import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Pages/Signup/Signup';
import { useSelector } from 'react-redux'
import SongList from './components/Pages/Home/SongList';
import AddSong from './components/Pages/Home/AddSong';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenicate);

  return (
    <Fragment>
      <Routes>
        <Route path='/' element={isAuth ? <SongList /> : <SignUp />} />
        <Route path='/song-list' element={isAuth ? <SongList /> : <SignUp />} />
        <Route path='/add-songs' element={isAuth ? <AddSong /> : <SignUp />} />




      </Routes>
    </Fragment>
  );
}

export default App;
