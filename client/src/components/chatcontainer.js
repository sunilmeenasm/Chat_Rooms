import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { RoomContext } from "../context/RoomContext";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import emojilogo from "../assets/emojilogo.jpg";
import chatroomlogo from "../assets/chatroomlogo.png";
import socketio from "socket.io-client";
import {Base,allMessagesRoute,createMessageRoute,leaveRoomRoute} from "../APIROUTES/Routes";
const ChatContainer = () => {
     const socketRef=useRef(null);
     const endmessageRef=useRef(null);
     const{setIsLeaving}=useContext(RoomContext)
     const[messageText,setMessageText]=useState("");
     const[allmessages,setAllmessages]=useState([]);
     const[isFetching,setIsFetching]=useState(true);
     const [emojiPickerShow,setEmojiPickerShow]=useState(false);
     const {currentRoom,setCurrentRoom,setCurrentSelected}=useContext(ChatContext);
     const {user}=useContext(AuthContext);
     const fetchmessages=async()=>{
          const {data}=await axios.post(allMessagesRoute,{currentRoom});
          if(data.status){
              setAllmessages(JSON.parse(JSON.stringify(data.allmessages)))
          }
      }

      useEffect(()=>{
          const room=currentRoom;
          if(currentRoom){
               socketRef.current=socketio.connect(Base);
               socketRef.current.emit("join-room",room._id);
          }
          return ()=>{
               socketRef.current.disconnect(room._id);
          }
      },[currentRoom])
     useEffect(()=>{
         if(socketRef.current!==null){
             socketRef.current.on("receive-msg",(message)=>{
                setAllmessages(prev=>[...prev,message]);
             });
          
         }
     },[user,currentRoom]);
     useEffect(()=>{
          fetchmessages();
          setIsFetching(false);
     },[user,currentRoom])

     useEffect(()=>{
          endmessageRef.current?.scrollIntoView();
     },[allmessages])

   const setTime=(d)=>{
     let time="";
     if(d.getHours()<10){
          time=time+"0"+d.getHours();
      }
      else if(d.getHours()<=12){
           time=time+d.getHours();
      }
      else if(d.getHours()<22){
          time=time+"0"+(d.getHours()-12);
      }
      else{
          time=time+d.getHours()-12;
      }
     if(d.getMinutes()<10){
          time=time+":0"+d.getMinutes();
      }
      else {
           time=time+":"+d.getMinutes();
      }
      if(d.getHours()>=12){
          time=time+" pm";
      }
      else if(d.getHours()<12){
           time=time+" am";
      }
      return time;
   }

     const handleSend=async(e)=>{
          e.preventDefault();
          if(messageText===''){
               return;
          }
          
          const message={
               messageText:messageText,
               senderEmail:user.userEmail,
               senderName:user.userName,
               roomId:currentRoom._id,
               time:setTime(new Date(Date.now()))
          }
          setMessageText("");
          const{data}=await axios.post(createMessageRoute,{message});
          if(data.status){
               socketRef.current.emit("send-msg",message,currentRoom._id);
               setAllmessages(prev=>[...prev,message]);
               setEmojiPickerShow(false);
               
          }

     }


     const handleLeave=async(e,currentRoom)=>{
            e.preventDefault();
            const{data}=await axios.post(leaveRoomRoute,{currentRoom,user});
            setIsLeaving(true);
            setCurrentRoom(null);
            setCurrentSelected(null);
            
     }

  const handleEmojiClick=(emojiObject)=>{
     let msg=messageText;
     msg=msg+emojiObject.emoji;
     console.log(emojiObject.emoji);
     setMessageText(msg);
  }
    return ( 
     <div className="chat-container">
        <div className="chat-container-header">
              <div className="roomname">
                   <img src={chatroomlogo} />
                   <h1>{currentRoom.roomName}</h1>
              </div>
               <div className="leaveroom">
                    <Link onClick={(e)=>handleLeave(e,currentRoom)}><b>LeaveRoom</b></Link>
               </div>

        </div>
        <div className="chat-container-body">
         { !isFetching && allmessages.map((message,index)=>{
          return (
               <div className="chat-box"  key={index}>
                    <div className={`${message.senderEmail===user.userEmail?"self":"other"}`}>
                              <div className="chat-content" >
                                   <h2>{message.messageText}</h2>
                                   <p>{message.senderName}&nbsp;&nbsp;{message.time}</p>

                              </div>
                    </div>
               </div>
          )
         })

         }
         <div ref={endmessageRef}></div>
        </div>
        <div className="chat-container-input">
            <div className="emoji">
                  <img src={emojilogo} onClick={()=>{setEmojiPickerShow(!emojiPickerShow)}}/>
                  <div className="emoji-picker">
                     {emojiPickerShow &&
                         <Picker onEmojiClick={(emojiObject)=>handleEmojiClick(emojiObject)}></Picker>
                       }
                  
                  </div>     
            </div>
           
            <input onKeyDown={(e)=>e.key==="Enter"?handleSend(e):null}placeholder="Type message here" value={messageText} type="text" onChange={(e)=>setMessageText(e.target.value)} 
              />
              <button type="submit" onClick={(e)=>handleSend(e)}>send</button>
        </div>
      </div>
     );
}
 
export default ChatContainer;