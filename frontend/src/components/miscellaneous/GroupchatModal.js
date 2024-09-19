
import React from 'react'
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { FormControl, useToast } from '@chakra-ui/react';
import { Modal, Button , ModalOverlay, ModalContent , ModalHeader , ModalBody , ModalFooter , ModalCloseButton , Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

const GroupchatModal = () => {
    const toast = useToast()
    const { isOpen , onClose , onOpen } = useDisclosure();  
    const [groupChatName, setGroupchatName]= useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const {user , chats , setchats } = ChatState();
 const handleSearch =async (query) =>{
    setSearch(query);
  
    
    if(!query){
        return;
    }
    try {
        setLoading(true);
        
        
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            },
           
        }
   
        
        const {data} =await  axios.get(`http://localhost:5000/api/user?search=${search}`,config)
setLoading(false);
setSearchResult(data);



    } catch (error) {
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
       const handleSubmit = async () => {
        if(!groupChatName || !selectedUsers){
            toast({
                title: "Please Fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                },

            }
            const {data} = await axios.post('http://localhost:5000/api/chat/group',{
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u)=>u._id)),
            },config)
            setchats([data,...chats]);
            onClose();
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            setLoading(false);
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }
    const handleGroup = async (userToAdd)=>{
        console.log(userToAdd);
        
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
            return;
        }
    setSelectedUsers([...selectedUsers,userToAdd]);
    
   console.log(selectedUsers);
   
    
       
        
    }
    const handleDelete = (delUser)=>{
        setSelectedUsers(selectedUsers.filter((sel)=>sel._id !== delUser._id))
    }
  return (
<>



<div className='flex flex-col ' >
<input className='h-10 p-3 m-3 rounded-md' placeholder='Chat Name' onChange={e=>setGroupchatName(e.target.value)}/>
<input className='h-10 p-3 m-3 rounded-md' placeholder='Add Users'  onChange={(e)=>handleSearch(e.target.value)}/>
</div>

<div className='flex flex-col gap-4 items-center'>
    {
        selectedUsers.map((u)=>{
            return(
                <div key={u._id} className="badge badge-success gap-2">
  <svg onClick={()=>handleDelete(u)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="inline-block h-4 w-4 stroke-current">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"></path>
  </svg>
  {u.name}
</div>
            )
        })
    }
{/* {  selectedUsers.map((u)=>{
  
    return(
 <UserBadgeItem key={user._id}  handleFunction={()=>handleDelete(u)} user={u}/> 
)})} */}
</div>
{
    loading ? <div>loading</div>:(
        <div className='flex flex-col gap-4 items-center'>
            {
             searchResult?.slice(0,3).map((user) => (
                <div key={user._id} className="flex flex-row  items-center justify-start gap-3 mb-6 p-2 pr-4 pl-3 rounded-md hover:bg-base-300 cursor-pointer">
              
              <img src={user.pic}  className="w-10 h-10 rounded-full" />
              <div className='flex flex-row justify-between gap-8 items-center'>
              <h2 className='userName text-xl'>{user.name}</h2>
             
               
             <AddIcon onClick={()=>handleGroup(user)} />
          
              </div>
              
              
              </div>
             ))

            }
        </div>
    )
}
      


<form method="dialog">
  {/* if there is a button in form, it will close the modal */}
  <div className='flex flex-row justify-between gap-8 items-center'>
           <button className='btn btn-success text-green-950 font-normal font-mono ' onClick={handleSubmit}>
              Create Chat
            </button>
            <button className='btn btn-error text-green-950 font-normal font-mono ' >
              Cancel
            </button>
            </div>
</form>

     
         
        
</>
  )
}

export default GroupchatModal