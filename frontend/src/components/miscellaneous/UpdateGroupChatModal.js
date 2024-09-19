import React from 'react'
import { useState } from 'react'
import { FormControl, IconButton, Input, Spinner, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { ViewIcon } from '@chakra-ui/icons'
import { Image,Box , Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { AddIcon } from '@chakra-ui/icons'
import { EditIcon } from '@chakra-ui/icons'
const UpdateGroupChatModal = ({fetchAgain, setfetchAgain , fetchMessages}) => {
    
    const { isOpen , onOpen , onClose } = useDisclosure();
    const {selectedChat,user , setSelectedChat} = ChatState();
    const [groupChatName, setgroupChatName] = useState();
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState([]);


   
    const [loadingChat, setLoadingChat] = useState(false);

    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();
    const handleRemovel = async (user1) => {
    
    
        if(selectedChat.groupAdmin._id !== user._id) {
           
            
            toast({
                title: "Only admins can delete users",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }
        // if(user1._id === selectedChat.groupAdmin._id) {
        //     toast({
        //         title: "Admin cannot be removed from group",
        //         status: "warning",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom"
        //     });
        //     return;
        // }
        // if(user1._id === user._id) {
        //     toast({
        //         title: "You cannot remove yourself from group",
        //         status: "warning",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom"
        //     });
        //     return;
        // }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.put(`/api/chat/groupremove`,{
                chatID: selectedChat._id,
                userID: user1._id,
                // users: [...selectedChat.users, user1],
            }, config);
       

            user._id === user1._id ? setSelectedChat() : setSelectedChat(data);
         
           
            
           setfetchAgain(!fetchAgain);
        
            
            toast({
                title: "Group Chat Updated",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoadingChat(false);
            fetchMessages();
            onClose();
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Update the Group Chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }

    }
const renameGroupName = async()=>{
    if(!groupChatName || !selectedChat){
        toast({
            title: "Please fill all the fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        return;
    }
    setRenameLoading(true);
    try {
        
        
        const config = {
            headers: {
           
                Authorization: `Bearer ${user.token}`,
            },
        };
      
        
        const {data} = await axios.put(`http://localhost:5000/api/chat/rename`,{
            chatID: selectedChat._id,
            chatName: groupChatName,
        }, config);
    
        
        setSelectedChat(data);
        setfetchAgain(!fetchAgain);
        toast({
            title: "Group Chat Name Updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        setRenameLoading(false);
        onClose();
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: "Failed to Update the Chat Name",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        setRenameLoading(false);
        setgroupChatName("");
    }
}
const searchHandler = async(query)=>{
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
const addToGroup = async(userToAdd)=>{
    setLoadingChat(true);
    if(!selectedChat){
        toast({
            title: "Please select a chat to add user",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        return;
    }
    if(selectedChat.users.find((u)=> u._id === userToAdd._id)){
        toast({
            title: "User already added",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        return;
    }
    if(selectedChat.groupAdmin._id !== user._id){
        toast({
            title: "Only Admin can add a user to the group chat",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        return;
    }
    try {
        const config = {
            headers: {

                Authorization: `Bearer ${user.token}`,
            },
        };
        

        const {data} = await axios.put(`http://localhost:5000/api/chat/groupadd`,{
            chatID: selectedChat._id,
            userID: userToAdd._id,
            // users: [...selectedChat.users, userToAdd],
        }, config);
      

        setSelectedChat(data);
        setfetchAgain(!fetchAgain);
        toast({
            title: "Group Chat Updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
        setLoadingChat(false);
        onClose();
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: "Failed to Update the Group Chat",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
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
    console.log("deleteing");
    
}


    return (
        <>
          <label  className=" edit"> <EditIcon onClick={()=>document.getElementById('my_modal_6').showModal()} /> </label>
         
          <dialog id='my_modal_6' className="modal" >
          <div className="modal-box">
            
          <div className="modal-action flex flex-col gap-4">
          <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm  btn-circle btn-ghost absolute right-2 top-2"><p className='text-red-600 text-4xl font-normal font-mono'>x</p></button>
    </form>
          <div className='flex flex-wrap gap-2' >
                {
                    selectedChat.users.map((user) => (
                        <div key={user._id} className="badge badge-success gap-2 p-3">
                        <svg onClick={()=>handleRemovel(user)}
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
                        {user.name}
                      </div>
                     ))
                }
              </div>
              <div className='flex flex-row gap-2' >
                <input placeholder="Chat Name" className='input w-full' value={groupChatName} onChange={(e) =>{ setgroupChatName(e.target.value);}} />
             
                <button className='btn btn-success font-mono' onClick={renameGroupName} isLoading={renameLoading}>Update</button>
               
              </div>
              <div >
              <input placeholder="Add User to Group" className='input w-full' onChange={(e) =>{ searchHandler(e.target.value)}} />
              </div>
              {
                loading ? (
            <Spinner size="lg" />
                ) : (
                    searchResult?.slice(0, 4).map((user) => (
                        <div className='flex flex-col gap-4 items-center'>
            {
             searchResult?.slice(0,3).map((user) => (
                <div key={user._id} className="flex flex-row  items-center justify-start gap-3 mb-6 p-2 pr-4 pl-3 rounded-md hover:bg-base-300 cursor-pointer">
              
              <img src={user.pic}  className="w-10 h-10 rounded-full" />
              <div className='flex flex-row justify-between gap-8 items-center'>
              <h2 className='userName text-xl'>{user.name}</h2>
             
               
             <AddIcon onClick={()=>addToGroup(user)} />
          
              </div>
              
              
              </div>
             ))

            }
        </div>
                    ))
                )
              }
           
                <button  className='btn btn-error font-mono btn-error'  onClick={()=>{handleRemovel(user)}}>
                  Leave
                </button>
    

    </div>
  </div>
 
            </dialog>
        
              
          
       
        </>
      )
}

export default UpdateGroupChatModal
