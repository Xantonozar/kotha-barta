import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ChatBox.css'
import { ChatState } from '../context/ChatProvider';
import SingleChat from './SingleChat';
const ChatsBox = (fetchAgain,setfetchAgain) => {
  const {selectedChat} = ChatState()
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
    setDeviceHeight(window.innerHeight);
  }, [])
  
  
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
      setDeviceHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);  
const myChats = document.querySelector('.my-chat-box');
if(deviceWidth < 1050 ){
  if(selectedChat){
    console.log("display chat box full");
    
myChats.classList.add('res-full');
myChats.classList.remove('dis-none');
  }else{
    console.log("display none chatbox")
    myChats.classList.add('dis-none');
  }
 
}else{
  console.log("pc version");
  myChats.classList.remove('dis-none');

myChats.classList.remove('res-full');

}



})
  return (
    <div className='my-chat-box '>
<SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
  
    </div>
  )
}

export default ChatsBox