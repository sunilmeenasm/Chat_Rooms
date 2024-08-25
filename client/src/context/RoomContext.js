import { createContext ,useState} from "react";
export const RoomContext=createContext();
const RoomContextProvider = ({children}) => {
    const[createRoom,setCreateRoom]=useState(false);
    const[isJoined,setIsJoined]=useState(false);
    const [isLeaving,setIsLeaving]=useState(false);
    const[isFetching,setISFetching]=useState(true)
    return ( 
       
        <RoomContext.Provider value={{createRoom,setCreateRoom,isJoined,setIsJoined,isLeaving,setIsLeaving,isFetching,setISFetching}}>
            {children}
        </RoomContext.Provider>
     );
}
 
export default RoomContextProvider;