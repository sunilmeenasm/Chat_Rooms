const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const roomSchema=new Schema({
    roomName:{
        type:String,
        required:true,
        unique:true
    },
    users:{
        type:[{type:mongoose.Types.ObjectId,ref:"User"}]
    },
    messages:{
       type:[{type:mongoose.Types.ObjectId,ref:"Message"}]
    }

},{timestamps:true});

const Room=mongoose.model("Room",roomSchema);
module.exports=Room;