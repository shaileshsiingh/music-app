import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Pages/Signup/Signup';
import { useSelector } from 'react-redux'
import SongList from './components/Pages/Home/SongList';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenicate);
  
  return (
    <Fragment>
      <Routes>
        <Route path='/song-list' element={isAuth ? <SongList /> : <SignUp />} />

        <Route path='/' element={isAuth ? <SongList />: <SignUp />} />
      </Routes>
    </Fragment>
  );
}

export default App;
