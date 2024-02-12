import React, { useEffect, useRef, useState } from 'react'
import InputFeild from './InputFeild'
import User from './User'
import { useFirebase } from '../providers/Firebase'
import Header from './Header'
import bg from "./bg.jpg"
import { useSocket } from '../providers/Socket'
import Message from './MessageBox'
import messageTone from "./message-tone.mp3"
const RightSide = () => {
  const { user } = useFirebase()
  const { socket } = useSocket()
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
 const ref = useRef(null)
 const Tone = new Audio(messageTone);
  const handelSubmit = (e) => {
    console.log("hey");
    e.preventDefault();
    const data = {
      userName: user?.displayName || "anonymouse",
      message: input,
      dateTime: new Date()
    }
    addMessagetoUI(true, data);
    setInput("");
    handleScrollToBottom()
    socket.emit("message", data);
  }
  const handleScrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom smoothly
  };
  const handelMessageReceived = (data) => {
    Tone.play();
    addMessagetoUI(false, data);
  }
  useEffect(() => {
    socket.on("chat-message", handelMessageReceived);
    return () => {
      socket.off("chat-message", handelMessageReceived);
    }
  }, [socket])
  const addMessagetoUI = (isOwnMessage, data) => {
    const time = new Date(data.dateTime).toLocaleTimeString();
    setMessage(prev=>[...prev,{isOwnMessage,data}])   
  }
  return (
    <div className='w-full h-full relative flex justify-start flex-col rounded-lg items-start bg-contain bg-center'
      style={{ background: `url(${bg})` }}
    >
      <Header />
      <div className='flex h-10 absolute bottom-5 w-full justify-center gap-2 items-center'>
        <User />
        <InputFeild input={input} setInput={setInput} handelSubmit={handelSubmit} userName={user?.displayName||"anonymouse"}/>
      </div>
      <div className='flex flex-col w-full h-auto overflow-y-scroll' ref={ref}>
      {messages.map((message, index) => (
      <Message key={index} isOwnMessage={message.isOwnMessage} data={message.data} />
    ))}
      </div>
    </div>
  )
}

export default RightSide