import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isItMe, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic'
import { Tooltip } from '@chakra-ui/react'

import { ChatState } from '../context/ChatProvider'
import { Avatar } from '@chakra-ui/react'
const ScrollableChat = ({messages}) => {
    const {user} = ChatState()
  return (
    <ScrollableFeed>
{
    messages && messages.map((m,i)=>(
        <div className='flex flex-col' key={m._id}>
          {
            isItMe(messages,m,i,user._id)?(
            <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={m.sender.pic} />
    </div>
  </div>
  <div className="chat-bubble">{m.content}</div>
</div>
            ):(
              <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={m.sender.pic} />
    </div>
  </div>
  <div className="chat-bubble">{m.content}</div>
</div>
            )
            
          }

     {/* {
        (isSameSender(messages,m,i,user._id) || isLastMessage(messages,i,user._id)) && (
          <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
            <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.name} src={m.sender.pic} />
          </Tooltip>
        )
     } */}
     {/* <span style={{backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`, borderRadius: "20px", padding: "5px 15px", maxWidth: "75%" , marginLeft: isSameSenderMargin(messages,m,i,user._id), marginTop: isSameUser(messages,m,i,user._id) ? 3 : 10}}>
{m.content}
        </span> */}
        </div>
    ))
}
    </ScrollableFeed>
  )
}

export default ScrollableChat