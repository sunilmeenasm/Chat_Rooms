import { createContext, useState } from "react";
export const ChatContext=createContext();

const ChatContextProvider=({children})=>{
    const [currentSelected,setCurrentSelected]=useState(null);
    const [currentRoom,setCurrentRoom]=useState(null);
    return(
        <ChatContext.Provider value={{currentSelected,setCurrentSelected,currentRoom,setCurrentRoom}}>{children}</ChatContext.Provider>
    );
   
}
export default ChatContextProvider;