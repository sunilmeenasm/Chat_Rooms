const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    messageText:{
        type:String,
        required:true
    },
    senderEmail:{
        type:String,
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    roomId:{
        type:mongoose.Types.ObjectId
    },
    time:{
       type:String,
       required:true
    }
})

const Message=mongoose.model("message",messageSchema);
module.exports=Message;