import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";
import { RoomContext } from "../context/RoomContext";
import {allRoomsJoinedRoute,createRoomRoute} from "../APIROUTES/Routes";

const SidebarMain= () => {
    const{currentSelected,setCurrentSelected,setCurrentRoom}=useContext(ChatContext);
    const{createRoom,setCreateRoom,isJoined,setIsJoined,isLeaving,setIsLeaving,isFetching,setISFetching}=useContext(RoomContext);
    const [rooms,setRooms]=useState([]);
    const[roomCreateError,setRoomCreateError]=useState(false);
    const[roomErrorMessage,setRoomErrorMessage]=useState("");
    
    const[roomName,setRoomName]=useState("");
    
    const {user}=useContext(AuthContext);
    const handleSelect=(room)=>{
        setCurrentSelected(room._id);
        setCurrentRoom(room);
    }
    const handleCreate=async(e)=>{
        e.preventDefault();
           if(roomName===''){
            setRoomCreateError(true);
            setRoomErrorMessage("please fill the roomname")
            return
           }
           console.log("handleCreate   ",user);
            const {data}= await axios.post(createRoomRoute,{roomName,user});
            if(data.status){
               const room= JSON.parse(JSON.stringify(data.room))
               setRooms(prev=>[...prev,room]); 
               setCurrentSelected(room._id);
               setCurrentRoom(room);
               setRoomCreateError(false);
               setCreateRoom(false);
               setRoomName("");
            }
            else{
               setRoomCreateError(true);
               setRoomErrorMessage(data.msg);
            }
    }
    const fetchrooms=async()=>{
        const {data}=await axios.post(allRoomsJoinedRoute,{user});
        if(data.status){
            setRooms(JSON.parse(JSON.stringify(data.allrooms)))
        }
    }
   
    useEffect(()=>{
        fetchrooms();
        setISFetching(false);
        return ()=>{
            setIsJoined(false);
            setISFetching(true);
            setIsLeaving(false);
        }
    },[isJoined,isLeaving,currentSelected]);
    return ( 
        <div className="room-container-main">
                        {!(isFetching) && rooms.map((room)=>{
                            return (
                            
                                <div className={`room-box ${room._id===currentSelected?"selected":""}`} key={room._id} 
                                  onClick={()=>{handleSelect(room)}}
                                >
                                    <h1>{room.roomName}</h1>
                                </div>
                            )
                        })

                        }

                        <div className="create-room-box">
                                    {roomCreateError && 
                                      <div className="error">
                                          <p>{roomErrorMessage}</p>
                                       </div>

                                    }

                                    {createRoom && 
                                        <div className="room-create">
                                                <input onKeyDown={(e)=>e.key==="Enter"?handleCreate(e):null} placeholder="Roomname.." name="roomName" type="text"  value={roomName} onChange={(e)=>setRoomName(e.target.value)} />
                                                <button onClick={(e)=>handleCreate(e)}>create</button>
                                        </div>

                                    }
                                    <div className="create-room-link" onClick={()=>{
                                        setCreateRoom(prev=>!prev);

                                    }}>
                                                <h2>Create New Room </h2>
                                    </div>
                                   
                        </div>
            </div>
               
     );
}
 
export default SidebarMain;