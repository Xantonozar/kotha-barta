import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import { Stack, Toast } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import './MyChats.css'
import { useEffect } from 'react';
import {AddIcon , ArrowBackIcon} from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';


const MyChats = () => {
    const { user , setSelectedChat , chats , setchats , notification , setNotification } = ChatState();
    const toast = useToast();
    const [search, setsearch] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [loading, setloading] = useState(false);
    const [loadingChat, setloadingchat] = useState(false);
    const history = useHistory();
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
          const { data } = await axios.post(`/api/chat`, { userID: userId}, config);
      if(!chats.find((c)=>c._id === data._id)){
      setchats([data,...chats]);
        }
      
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
        const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
        const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
        
        useEffect(() => {
          const handleResize = () => {
            setDeviceWidth(window.innerWidth);
            setDeviceHeight(window.innerHeight);
          };
      
          window.addEventListener('resize', handleResize);  
      const myChats = document.querySelector('.my-chats');
      const menuDrawer = document.querySelector('.menu-drawer');
      console.log(menuDrawer);
      
     if(deviceWidth < 1050){
        myChats.classList.add('res-full');
        menuDrawer.classList.add('res-full');
     }else{
      myChats.classList.remove('res-full');
      menuDrawer.classList.remove('res-full');
     
     }
     
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        });
  return (
    <div    className='my-chats flex flex-col gap-2'>
      
    <label htmlFor="my-drawer" className="btn btn-block add-user"> <AddIcon boxSize={6} /> Add New User </label>

<div className="drawer search-user-drawer">
  <input id="my-drawer" onClick={()=>{document.querySelector('.drawer-side').classList.add('slide')}} type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    {/* <ul className="menu menu-drawer bg-base-200 text-base-content min-h-full w-80 p-4">
      
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul> */}
    <div className="menu menu-drawer bg-base-200 flex flex-col text-base-content min-h-full w-80 p-4">
        <div className="flex justify-between mb-10 items-center gap-1">
              <label htmlFor="my-drawer" className=" ">
    <ArrowBackIcon boxSize={8}/>
    </label>
                <label className="input search-label input-bordered flex w-full items-center gap-2">
              
  <input type="text" onChange={async (e) => { setsearch(e.target.value) ;await HandleSearch()}} className="grow search-input" placeholder="Search Users" />
  <svg
  onClick={HandleSearch}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 search-icon opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label></div>
{ loading?(<>
    <div className="flex skel-load flex-col gap-4">
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
  <div className="skeleton h-12 w-full"></div>
</div>
</>): (searchResult?.map((user) => (
  <div key={user._id} onClick={()=>{accessChat(user._id)}} className="flex show-users items-center justify-between gap-2 mb-6 p-2 pr-4 pl-3 rounded-md hover:bg-base-300 cursor-pointer">

<img src={user.pic}  className="w-10 h-10 rounded-full" />
<h2 className='userName'>{user.name}</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

</div>
    
    )))}
</div>
  </div>
</div>
    </div>
  )
}

export default MyChats