import React from 'react'
import logo from './Screenshot_2024-09-05_053013-removebg-preview.png'
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { ArrowBackIcon,Search2Icon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import './SideDrawer.css'
const SideDrawer = () => {
  const { user , setSelectedChat , selectedChat , chats , setchats , notification , setNotification } = ChatState();
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingchat] = useState(false);


const history = useHistory();
const logoutHandler = () => {
  localStorage.removeItem("userInfo");
  console.log(userInfo);
  
  history.push("/");
};
const userInfo =JSON.parse(localStorage.getItem("userInfo"));

const toast = useToast();
const accessChat = async  (userId)=>{

  
  setloadingchat(true);
  if(!search){
    toast({
      title: "Please Fill the search feild",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }
  try{
   
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post( "http://localhost:5000/api/chat", { userID: userId}, config);
if(!chats.find((c)=>c._id === data._id)){
setchats([data,...chats]);
  }
console.log(data);

    setSelectedChat(data);
    setloadingchat(false);
    setsearchResult([]);
    
    history.push(`/chat/${data._id}`);
  }catch(error){
    toast({
      title: "Error Occured",
      description: "Failed to Load the Search Result",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    setloading(false);
}

}
const HandleSearch =async ()=>{
  if( search.length < 3){
    toast({
      title: "Minimum 3 letters required",
      status: "warning",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
    return;
  }
try{
  setloading(true);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

  setloading(false);
  setsearchResult(data);
  
}catch(error){
  toast({
    title: "Error Occured",
    description: "Failed to Load the Search Result",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom-left",
  });
  setloading(false);
  setsearchResult([]);
  
}

  }
  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, [])
  
const [deviceWidth, setDeviceWidth] = useState()
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
      
    };

    window.addEventListener('resize', handleResize);  
const myChats = document.querySelector('.chat-bar');
if(deviceWidth < 1050 ){
if(selectedChat){
  myChats.classList.add('dis-none');

}else{
myChats.classList.remove('dis-none');
}
   
  
 
}else{
myChats.classList.remove('dis-none');

}
  })
  
  return (
    <div className='chat-bar'>
    <div className="nav-head navbar  h-15">
    
    <div className="flex-none">
      
    <label htmlFor="my-drawer" className="search-user items-center gap-2">


    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-9 ml-4 w-9 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
  
    </label>

  </div>
  
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Kotha - Barta</a>
  </div>
  <div className="flex-none gap-6">
  <button className="btn btn-ghost btn-circle">
      <div className="indicator noti">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="badge badge-xs badge-success indicator-item"></span>
      </div>
    </button>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
        <div className="ring-success ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
          <img
            alt="Tailwind CSS Navbar component"
            src={userInfo.pic} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow profile-list">
        <li onClick={()=>document.getElementById('my_modal_2').showModal()}>
          <a className="justify-between">
            Profile
            <span className="badge badge-success gap-2">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li onClick={logoutHandler}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box flex flex-col items-center my-profile ">
  <div className='flex flex-col items-center'>
  <h3 className="font-bold text-lg">{user.name}</h3>
  <h3 className="font-bold text-lg">{user.email}</h3>
  <br/>
  </div>
  <br/>
  <br/>
  <br/>
    
    <div className="btn btn-ghost btn-circle my-pic avatar user-pic online">
        <div className="ring-success  ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
          <img 
            alt="Tailwind CSS Navbar component"
            src={userInfo.pic} />
        </div>
      </div>

   
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

</div>
  )
}

export default SideDrawer