import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import Playlist from './screens/Playlist/Playlist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path = '/playlist/:playlistId' element={<Playlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
