import React from 'react'

const Message = ({isOwnMessage,data}) => {
  return (
    <div className={`message w-[100%]  flex items-center ${isOwnMessage?"justify-end":"justify-start"} h-auto p-2`}>
    <div className={`message  max-w-[70%] h-full flex flex-col items-start rounded-t-md rounded-tr-md rounded-bl-md text-white justify-center p-2 ${isOwnMessage?"bg-[#B67352]":"bg-[#ECB159]"}`}>
           <p className='font-bold'>{data.userName} <span className=' text-xs font-normal ml-2'>9:24 am</span> </p>
           <p className='bg-transparent text-sm'>{data.message}</p>
    </div>
</div> )
}

export default Message;