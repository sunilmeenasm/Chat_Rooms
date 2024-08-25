const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");

router.post("/register",async(req,res)=>{
     try {
            const {userEmail,userName,password}=req.body;
            const isAlready=await User.findOne({userEmail});
            if(isAlready){
             return  res.json({msg:"Email Already Registerd",status:false});
            }
            const hasedPassword=await bcrypt.hash(password,10);
            const user=await  User.create({userEmail,userName,password:hasedPassword});
            const newuser={_id:user._id,userName,userEmail}
            res.json({status:true,newuser})
     } catch (error) {
        console.log(error);
     }
});

router.post("/login",async(req,res)=>{
    try {
           const {userEmail,password}=req.body;
           const user=await User.findOne({userEmail});
           if(! user){
             return  res.json({msg:"User not found",status:false});
           }
            const isPasswordValid= await bcrypt.compare(password,user.password);
           if(!isPasswordValid){
              return  res.json({msg:"Invalid Password",status:false});
           }
           const newuser={_id:user._id,userName:user.userName,userEmail:user.userEmail}
           res.json({status:true,newuser});
    } catch (error) {
       console.log(error);
    }
});



module.exports=router;