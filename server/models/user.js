const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    userEmail:{
        type:String,
        unique:true,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String
    }
    
});

const User=mongoose.model("User",userSchema);
module.exports=User;