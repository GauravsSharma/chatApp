import React from 'react'
import { useFirebase } from '../providers/Firebase'
import dummyUser from "./dummyUser.png"
const User = () => {
    const {user} = useFirebase();
    const url = user?.photoURL?user.photoURL:dummyUser;
  return (
    <div className='h-9 w-9 rounded-full overflow-hidden'>
        <img src={url} alt=""  className='w-full h-full'/>
    </div>
  )
}

export default User