import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
    const history=useHistory();
const [user, setuser] = useState()
const [selectedChat ,setSelectedChat] = useState();
const [chats , setchats] = useState([]);
const [FetchAgain , setFetchAgain] = useState(false);
const [notification , setNotification] = useState([]);
const [animation , setAnimation] = useState(false);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
     
        if (!userInfo) {
                 
            history.push("/");
    }
        
    }
     , [history])
    
    return (
        <ChatContext.Provider value={{ user,setuser,selectedChat,setSelectedChat , chats , setchats , FetchAgain , setFetchAgain , notification , setNotification , animation , setAnimation }}>
            {children}
        </ChatContext.Provider>
    )
}
 export const ChatState = () => {
    return useContext(ChatContext);
}
export default ChatProvider;