import { useEffect, useState } from 'react'
import './App.css'
import { SocketProvider, useSocket } from './providers/Socket'
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import RoomPage from './pages/RoomPage';
import Login from './pages/login/Login';
import { FirebaseProvider } from './providers/Firebase';

function App() {

  return (
    <>
      <SocketProvider>
        <FirebaseProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/chat' element={<Homepage />} />
            <Route path='/room/:roomId' element={<RoomPage />} />
          </Routes>
        </FirebaseProvider>
      </SocketProvider>
    </>
  )
}

export default App
