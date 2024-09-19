import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box ,  FormControl,  IconButton,  Input,  Spinner,  Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

import { getSender,getSenderFull, getSenderPic } from '../config/ChatLogic'
import ProfileModel from './miscellaneous/ProfileModel'
// import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import { useState } from 'react'
import "./SingleChat.css"
import ScrollableChat from './Scrollablechat'
import { ArrowBackIcon } from '@chakra-ui/icons'
import io from 'socket.io-client'
import Lottie from "react-lottie";
import socketio from 'socket.io-client'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
const ENDPOINT = "https://kotha-barta.onrender.com/";
var socket, selectedChatCompare;

const SingleChat = (fetchAgain,setfetchAgain) => {
    const toast = useToast();
    const {user , setchats , notification , setNotification , selectedChat , setSelectedChat  , setFetchAgain } = ChatState();
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);                                      
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const  [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require("../animation/typing-1.json"),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
      const typingHandler = (e) => {
        setNewMessage(e.target.value);
        console.log(newMessage);
        
        if(!socketConnected) return;
        if(!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }

    const sendMessage = async (e) => {
       scrollToBottom()
        const chatRoom = await selectedChat._id;
        console.log(chatRoom);
        socket.emit("stop typing", selectedChat._id);
        if(e.key === "Enter" && newMessage) {
            try {
              
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                };
                
               
                const {data} = await axios.post("/api/message",{
                    content: newMessage,
                    chatID: selectedChat._id
                },config);
         
              
                
                
                setMessage([...message,data]);
                // console.log(socket.emit("new message",data));
                setLoading(true);
                setNewMessage("");   
            
                    socket.emit("new message",data);
                    console.log(data);
                    
                
               
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                });
            }
            setLoading(false);
         setNewMessage("")
            
            
    };
    fetchMessages();
}
const fetchMessages = async ()=>{
scrollToBottom()
    if(!selectedChat) {
       
        
        return;
    }
    try {
       setLoadingChat(true);
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        };
        const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);
        setMessage(data);
 
     
        socket.emit("join chat", selectedChat._id);
        const roomName = selectedChat._id;
        socket.emit("join room",roomName);
        setLoadingChat(false);
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: "Failed to Load the message",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left"
        });
    }
  if (loadingChat===true) {
    
   
  
  }
    
    
}
useEffect(() => {
    socket = socketio(ENDPOINT);
   
    
    socket.emit("setup", user);
   
    
    socket.on("connected", () => {setSocketConnected(true)});
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    
    
}, [])
useEffect(() => {
fetchMessages();
selectedChatCompare = selectedChat;


}, [selectedChat]);
{
window.addEventListener('beforeunload', () => {
  socket.disconnect();
});
}

  useEffect(() => {

    socket.on("message-recieved", (newMessageRecieved) => {
       
        fetchChats()
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notification.includes(newMessageRecieved)) {
            setNotification([newMessageRecieved, ...notification]);
            
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessage([...message, newMessageRecieved]);
         
        }
      });
    // socket.on("message-try",(chat)=>{
    //     console.log("message received successfully by admin");
    //         } );
    socket.on("message-recieved",(chat)=>{
        console.log("message received successfully via trial");
            } );
    // socket.on("joined room",(room)=>{
    //     console.log("joined room");
        
    //         } );
   
   scrollToBottom()
});
const  scrollToBottom=()=> {
    const chatContainer = document.querySelector('.message-container');
    if(chatContainer!==null){
    
    chatContainer.scrollTop = chatContainer.scrollHeight;  
    console.log(chatContainer.scrollTop);
    }
}
const fetchChats = async ()=>{
  try {
      const config = {
          headers:{
              Authorization: `Bearer ${user.token}`
          }
      }
      const { data } = await axios.get("/api/chat",config)
      setchats(data)
  } catch (error) {
      console.error(error)
      toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
      })
  }

}
const goback = ()=>{
  setSelectedChat("");
  fetchChats()
}
  return (
    <div className='single-chat '>
        {selectedChat?(<>
<div className='flex text-2xl font-bold font-mono'>
    {/* <IconButton display={{base:"flex",md:"none"}} icon={<ArrowBackIcon/>} onClick={()=> setSelectedChat("")}/> */}
{
    !selectedChat.isGroupChat?(<div className='flex flex-row justify-start align-center items-center'>
      { 
      <div className='flex flex-row justify-start align-center items-center gap-2'>
        <ArrowBackIcon className='ml-2' onClick={goback} />
        <div className="avatar online m-2" >
        
        <div  className="w-12 rounded-full">
          <label htmlFor='my-drawer'>
       <img onClick={()=>document.getElementById('my_modal_7').showModal()} src={getSenderPic(user,selectedChat.users)} /> 
         </label>
        </div>
      </div>
      </div>
}
  {  getSender(user,selectedChat.users)}

  {/* <ProfileModel selectedChat={selectedChat} user={getSenderFull(user,selectedChat.users)}/> */}
    </div>):(
        <>
        <div className='flex m-2 flex-row w-full justify-between align-center items-center'>
       <ArrowBackIcon className='ml-2' onClick={goback}  />
   <div className='flex m-2 flex-row w-full justify-between align-center items-center'>
   <h3 className=''> {selectedChat.chatName.toUpperCase()}</h3>
   <UpdateGroupChatModal dialoge={selectedChat} fetchMessages={fetchMessages} fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}/>
   </div>
   </div>
        </>
    )
}

</div>
<div className='single-chat-box message-container flex flex-col justify-between align-center'>
{
        loading?(<Spinner size="xl" h={20} w={20} alignSelf="center" margin="auto" />):(
            <div className='chat-box'>
                <ScrollableChat messages={message}/>
            </div>
        )
    }
 
          {
            isTyping?(<div>
            <Lottie 
            options={defaultOptions}
            width={70}
            style={{ marginLeft:0 , marginBottom:15}}
            />
            </div>):(<></>)
          }
      
    
  
    </div>
    <div className="flex flex-grow justify-center">    <input  placeholder='Type a message here' onClick={scrollToBottom} onKeyDown={sendMessage}  onChange={typingHandler} value={newMessage} type="text"  className="input  send-message" /></div>
    <dialog id="my_modal_7" className="modal">
        <div className="modal-box flex flex-col items-center my-profile ">
        <div className='flex flex-col items-center'>
        <h3 className="font-bold text-lg">{getSenderFull(user,selectedChat.users).name}</h3>
        <h3 className="font-bold text-lg">{getSenderFull(user,selectedChat.users).email}</h3>
        <br/>
        </div>
        <br/>
        <br/>
        <br/>
          
          <div className="btn btn-ghost btn-circle my-pic avatar user-pic online">
              <div className="ring-success  ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
                <img 
                  alt="Tailwind CSS Navbar component"
                  src={getSenderFull(user,selectedChat.users).pic} />
              </div>
            </div>
      
         
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  
</>):(<>
    
</>)

   }

    </div>
  )
}

export default SingleChat
