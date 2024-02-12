import React from 'react';
import { IoSend } from "react-icons/io5";
import { useSocket } from '../providers/Socket';

const InputFeild = ({handelSubmit,input,setInput,userName}) => {
  const {socket} = useSocket()
  const handleOnFocus = ()=>{
    const message = `${userName} is typing`
     socket.emit("feedback",{feedback:message})
  }
  const handleBlur = ()=>{
    const message = ``
     socket.emit("feedback",{feedback:message})
  }
  return (
    <form className='w-[80%] bg-[#fff6d6] shadow-md text-black rounded-lg h-full overflow-hidden px-1 flex justify-start items-center' onSubmit={(e)=>handelSubmit(e)}>
      <input
        type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Type message here..'
        className='outline-none border-none mx-5 h-full w-[90%] bg-transparent text-black ::placeholder:text-black' // Apply placeholder color here
        onFocus={handleOnFocus}
        onBlur={handleBlur}
      />
      <div className='w-[10%] h-full flex justify-center items-center text-black'>
        <IoSend className='text-2xl mr-1'/>
      </div>
    </form>
  );
};

export default InputFeild;
