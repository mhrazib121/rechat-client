import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Chat from './Pages/Chat/Chat';
import Join from './Pages/Join/Join';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path='/' element={<Join></Join>} />
        <Route path='chat' element={<Chat></Chat>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
