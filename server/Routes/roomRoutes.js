const router=require("express").Router();
const Room=require("../models/rooms");
const Message=require("../models/message");
const User = require("../models/user");

router.post("/createroom",async(req,res)=>{
    const{roomName,user}=req.body;
    const isAlready=await Room.findOne({roomName});
    if(isAlready){
         res.json({msg:"room already exist",status:false})
    }
    else{
        const room=await Room.create({roomName,users:[user],messages:[]})
        res.json({status:true,room});
    }
})
router.post("/allroomsjoined",async(req,res)=>{
     try {
        const{user}=req.body;
        const allrooms=await Room.find({users:user}).sort({updatedAt:-1}).select(["_id","roomName"]);
        res.json({status:true,allrooms});
        
     } catch (error) {
        console.log(error);
     }
})
router.post("/allroomsavailable",async(req,res)=>{
    try {
       const{user}=req.body;
       const allrooms=await Room.find({users:{$ne:user}}).sort({updatedAt:-1}).select(["_id","roomName"]);
       res.json({status:true,allrooms});
       
    } catch (error) {
       console.log(error);
    }
})
router.post("/joinroom",async(req,res)=>{
    try {
        const{user,room}=req.body;
        const data=await Room.updateOne({_id:room._id},{$push:{users:user}})
        const users=await Room.find({_id:room._id}).select("users");
        res.json({status:true,data});
    } catch (error) {
        console.log(error)
    }
})
router.post("/leaveroom",async(req,res)=>{
    try {
        const{currentRoom,user}=req.body;
        const data=await Room.updateOne({_id:currentRoom._id},{$pull:{users:user._id}});
        res.json({status:true,data});
        
    } catch (error) {
        console.log(error);
    }
})

router.post("/createmessage",async(req,res)=>{
    try {
        const{message}=req.body;
        const data=await Message.create(message);
        await Room.updateOne({_id:message.roomId},{$push:{messages:data}});
        res.json({data,status:true});
    } catch (error) {
        console.log(error)
    }
    
})
router.post("/allmessages",async(req,res)=>{
    try {
        const{currentRoom}=req.body;
        const allmessages=await Message.find({roomId:currentRoom._id}).select([
            "messageText",
            "senderEmail",
            "senderName",
            "roomId",
             "time"
        ]);
         res.json({status:true,allmessages})
    } catch (error) {
        console.log(error);
    }
})




module.exports=router;
