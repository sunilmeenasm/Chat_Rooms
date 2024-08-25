import {useState,useEffect, useContext} from 'react';
import { Link} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import {registerRoute} from "../APIROUTES/Routes";
const Register = () => { 
    const navigate=useNavigate();
    const {user,setUser}=useContext(AuthContext);
    useEffect(()=>{
        if( localStorage.getItem("chat-user")){
            console.log("Register  ",user);
            setUser(JSON.parse(localStorage.getItem("chat-user")));
            console.log("Register  ",user);
            navigate("/chat");
        }
     },[])
const[userEmail,setUserEmail]=useState("");   
const [userName,setUserName]=useState('');
const [password,setPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');
const[isRegisterd,setIsRegisterd]=useState(false);
const[registerError,setRegisterError]=useState(false);
const[registerMessage,setRegisterMessage]=useState("");

const handleClick=async(e)=>{
    e.preventDefault();
    if(handleValidation()){
        const {data}=await axios.post(registerRoute,{userEmail,userName,password});
        if(data.status){
            setIsRegisterd(true);
            setRegisterError(false);
            navigate("/");
    
        }
        else{
            setRegisterError(true);
            setRegisterMessage(data.msg);
        }
    
    }
}
const validateEmail=()=>{
    const mail=document.getElementById("myemail").value;
    var regx=/^([a-zA-z0-9\._]+)@([a-zA-z0-9]+)\.([a-z]+)(\.([a-z]+))?$/
    if( regx.test(mail)){
        return true;
    }
    else{
        return false;
    }
}
const handleValidation=()=>{
    if(!validateEmail()){
        setRegisterError(true);
        setRegisterMessage("Enter a valid  email ")
        return false;
     }
    else if(password===""){
        setRegisterError(true);
        setRegisterMessage("password cant be empty")
        return false;
    }
    else if(password !==confirmPassword){
        setRegisterError(true);
        setRegisterMessage("password should be same");
        return false;
    }
    else if(userName===''){ 
        setRegisterError(true);
        setRegisterMessage("please fill the username");
        return false;
    }
    return true;
}
    return ( 
        <div className="join-container">
               <h1>Create User</h1>

               <div className="join-username">
                     <input required  id="myemail" placeholder='Email...'  value={userEmail} type="email" name="useremail" onChange={(e)=>setUserEmail(e.target.value)}/>
               </div> 
               <div className="join-username">
                     <input required placeholder='username...'  value={userName} type="text" name="username" onChange={(e)=>setUserName(e.target.value)}/>
               </div> 
               <div className="join-username">
                     <input required placeholder='password..'  value={password} type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
               </div>
               <div className="join-username">
                     <input required placeholder='confirm password..'  value={confirmPassword} type="password" name="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)}/>
               </div> 
                <div className="join-button">
                <button onClick={(e)=>handleClick(e)}>Create User</button>
                </div>   
                <div className="already">
                    <span>Already an Existing User? <Link to="/login">Login</Link></span>
                </div>

                { registerError &&
                    <div className="error">
                        <p>{registerMessage}</p>
                    </div>
                 }
                 {isRegisterd && 
                     <div className="registered">
                        <p>Registered Successfully </p>
                    </div>

                 }
        </div>

     );
}
 
export default Register;