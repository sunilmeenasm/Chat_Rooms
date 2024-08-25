import {useState,useEffect, useContext} from 'react';
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import {loginRoute} from "../APIROUTES/Routes";
const Login = () => { 
 const{setUser}=useContext(AuthContext);
 const navigate=useNavigate();
 


useEffect(()=>{
   if(localStorage.getItem("chat-user")){
        setUser(JSON.parse(localStorage.getItem("chat-user")));
        navigate("/chat");
   }
},[])
const [userEmail,setUserEmail]=useState('');
const [password,setPassword]=useState('');
const[loginError,setLoginError]=useState(false);
const[loginMessage,setLoginMessage]=useState("");

const handleClick=async(e)=>{
    e.preventDefault();
    if(handleValidation()){
        const {data}=await axios.post(loginRoute,{userEmail,password});
        if(data.status){
            localStorage.setItem("chat-user",JSON.stringify(data.newuser));
             setUser(JSON.parse(JSON.stringify(data.newuser)));
             navigate("/chat");
        }
        else{
            setLoginError(true);
            setLoginMessage(data.msg);
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
        setLoginError(true);
        setLoginMessage("Enter a valid Email");
        return false;
    }
    else if(password===""){
        setLoginError(true);
        setLoginMessage("password cant be empty")
        return false;
    }
    return true;
}

    return ( 
             <div className="join-container">
               <h1>Login User</h1>
               <div className="join-username">
                     <input required id="myemail" placeholder='Email...'  value={userEmail} type="email" name="userEmail" onChange={(e)=>setUserEmail(e.target.value)}/>
               </div> 
               <div className="join-username">
                     <input required placeholder='password..'  value={password} type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
               </div>
               
                <div className="join-button">
                <button onClick={(e)=>handleClick(e)}>Login</button>
                </div>   
                <div className="already">
                    <span>Don't have account? <Link to="/register">Register</Link></span>
                </div>
                {loginError &&
                   <div className="error">
                    <p>{loginMessage}</p>
                   </div>

                }
            </div>
     );
}
 
export default Login;