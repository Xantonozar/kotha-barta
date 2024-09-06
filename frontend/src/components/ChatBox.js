import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './ChatBox.css'
const ChatsBox = () => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
      setDeviceHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);  
const myChats = document.querySelector('.my-chat-box');
if(deviceWidth < 1050){
  myChats.classList.add('dis-none');
}else{
myChats.classList.remove('dis-none');

}
})
  return (
    <div className='my-chat-box '>

      {/* <input id="my-drawer" onClick={()=>{document.querySelector('.drawer-side').classList.add('slide')}} type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">

    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div> */}
  
    </div>
  )
}

export default ChatsBox