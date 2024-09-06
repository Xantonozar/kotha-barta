import React from 'react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { useState } from 'react'
import './Chat.css'
import { ChatState } from '../context/ChatProvider'
const Chats = () => {
    const {user} = ChatState()
    const [fetchAgain, setfetchAgain] = useState(false)
  return (
    <>
<div className='chat-sidebar flex '>

{user && <SideDrawer/>}
<div className='chat-body flex flex-row justify-between'>

{user && <MyChats fetchAgain={fetchAgain}/>}
{user && <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>}
</div>
</div>
    
    </>
  )
}

export default Chats