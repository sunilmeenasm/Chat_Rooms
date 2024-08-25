const Base="http://localhost:8000";


//User Routes

 const loginRoute=Base+"/api/user/login";
 const registerRoute=Base+"/api/user/register";


//RoomRoutes
const createRoomRoute=Base+"/api/chat/createroom";
const joinRoomRoute=Base+"/api/chat/joinroom";
 const leaveRoomRoute=Base+"/api/chat/leaveroom";
 const allRoomsJoinedRoute=Base+"/api/chat/allroomsjoined";
 const allRoomsAvailableRoute=Base+"/api/chat/allroomsavailable";


//chatRoutes

const createMessageRoute=Base+"/api/chat/createmessage";
const allMessagesRoute=Base+"/api/chat/allmessages";
export {Base,loginRoute,registerRoute,createRoomRoute,joinRoomRoute,leaveRoomRoute,allRoomsJoinedRoute,allRoomsAvailableRoute,createMessageRoute,allMessagesRoute}