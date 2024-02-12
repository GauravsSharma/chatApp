import React, { useCallback, useState } from 'react';
import { useSocket } from '../providers/Socket';
import { useNavigate } from 'react-router-dom';
import Login from './login/Login';
import LeftSide from "../components/LeftSide"
import RightSide from '../components/RightSide';
const Homepage = () => {
  const { socket } = useSocket();
  const [email, setEmail] = useState('');
  const [roomId, setRoomId] = useState();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, roomId);
      socket.emit('user-joined', {roomId,email});
      navigate(`room/${roomId}`);
    },
    [email, roomId, socket, navigate]
  );

  return (
    <div className='w-full h-screen justify-center items-center flex' style={{backgroundColor:"#e5c3c6"}}>
       {/* <LeftSide/> */}
       <div className='h-full sm:h-[95%] rounded-xl sm:w-[25%] w-full bg-white shadow-xl'>
       <RightSide/>
       </div>
    </div>
  );
};

export default Homepage;
