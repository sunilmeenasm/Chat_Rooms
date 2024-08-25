import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";
import { RoomContext } from "../context/RoomContext";
import roomslogo from "../assets/roomslogo.png";
import createroomlogo from "../assets/createroomlogo.png"
import { AuthContext } from "../context/AuthContext";
import {allRoomsAvailableRoute,joinRoomRoute} from "../APIROUTES/Routes";
const SidebarHeader = () => {
    const[availableRooms,setAvailableRooms]=useState([]);
    const{setCurrentSelected,setCurrentRoom}=useContext(ChatContext);
    const{isJoined,setIsJoined,isFetching,setISFetching,isLeaving,setIsLeaving}=useContext(RoomContext);
    const{user}=useContext(AuthContext);
    const fetchAvailableRooms=async()=>{
        const {data}=await axios.post(allRoomsAvailableRoute,{user});
        if(data.status){
            setAvailableRooms(JSON.parse(JSON.stringify(data.allrooms)))
        }
    }
    useEffect(()=>{
        fetchAvailableRooms();
        setISFetching(false);
        return ()=>{
            setIsJoined(false);
            setIsLeaving(false);
            setISFetching(true);
        }
    },[isJoined,isLeaving])
    const handleJoinRoom=async(e,room)=>{
        e.preventDefault();
        const {data}=await axios.post(joinRoomRoute,{user,room});
        setIsJoined(true);
        setCurrentSelected(room._id);
        setCurrentRoom(room);
        const element=document.getElementById("mydropdown");
        element.classList.remove("show");
    }

    const handleShow=(e)=>{
        e.preventDefault();
        const element=document.getElementById("mydropdown");
        if(element.classList.contains("show")){
            element.classList.remove("show");
        }
        else{
            element.classList.add("show");
        }

    }
    return ( 
        <div className="room-container-header">
                <div className="roomlogo">
                <img src={roomslogo} />
                    <h1>Chat Rooms</h1>
                </div>
                <div className="availablerooms">
                    <div className="dropdown">
                        <img onClick={(e)=>{handleShow(e)}} src={createroomlogo} />
                        <div id="mydropdown"className="dropdown-content">
                                  
                                <h1>Available Rooms</h1>
                                {!(isFetching) && availableRooms.map((room)=>{
                                        return (
                                            <div className="room-box" key={room._id} >
                                                <h1>{room.roomName}</h1>
                                                <button onClick={(e)=>handleJoinRoom(e,room)}>JOIN ROOM</button>
                                            </div>
                                        )
                                    })

                                    }
                                    
                        </div>
                    </div>
                </div>
        
    </div>
     );
}
 
export default SidebarHeader;