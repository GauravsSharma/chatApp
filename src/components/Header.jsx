import React, { useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'

const Header = () => {
    const {socket} = useSocket();
    const [totalClients,setTotalClients] = useState(null);
    const [feed,setFeed] = useState("");
    const getTotalclients = ({length})=>{
        console.log("added");
        setTotalClients(length);
     }
     const handleFeedback=({feedback})=>{
        setFeed(feedback)
     }
    useEffect(()=>{
     socket.on("clients-total",getTotalclients)
     socket.on("feedback",handleFeedback)
     return ()=>{
        socket.off("clients-total",getTotalclients);
     }
    },[])
  return (
    <div className='h-12 w-full bg-[#76453B] shadow-xl'>{totalClients}
    {feed}
    </div>
  )
}

export default Header