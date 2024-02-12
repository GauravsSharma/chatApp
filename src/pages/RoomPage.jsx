import React, { useEffect, useState } from 'react';
import { useSocket } from '../providers/Socket';
import toast, { Toaster } from 'react-hot-toast';
import { IoSend } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
  const { socket } = useSocket();
  const [allUsers, setAllUsers] = useState(null);
  const { roomId } = useParams();
  const [mssg, setMssg] = useState('');
  const [userMessages, setUserMessages] = useState([]);

  const handleNewUserJoined = ({ email }) => {
    toast.success(`${email} join the chat`);
  };

  const handleUserList = ({ listOfAllConnectedUser }) => {
    console.log(listOfAllConnectedUser);
    // Update allUsers state if needed
    setAllUsers(listOfAllConnectedUser);
    console.log(listOfAllConnectedUser);
  };

  const handleSend = () => {
    socket.emit('message', { message: mssg, roomId });
    setMssg(''); // Clear the input after sending a message
  };

  const handleUserMessages = ({ message }) => {
    setUserMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    socket.on('new-user-joined', handleNewUserJoined);
    socket.on('user-list', handleUserList);
    socket.on('message', handleUserMessages);

    return () => {
      socket.off('new-user-joined', handleNewUserJoined);
      socket.off('user-list', handleUserList);
      socket.off('message', handleUserMessages);
    };
  }, [socket]);

  return (
    <div>
      RoomPage
      <div className='relative h-[90vh]'>
        <div className='flex w-full h-[90%]'>
          <ul className='userMessages'>
            {userMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <div className='absolute p-2 bottom-0 left-0 w-full border-2 rounded-full border-blue-600 flex justify-center items-center '>
          <input
            type='text'
            className='w-full p-2 bg-transparent outline-none text-xl'
            value={mssg}
            onChange={(e) => setMssg(e.target.value)}
          />
          <div className='h-10 w-10 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer' onClick={handleSend}>
            <IoSend />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default RoomPage;
