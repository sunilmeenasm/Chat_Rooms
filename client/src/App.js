
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Chat from "./pages/chat.js";
import Register from "./pages/Register.js";
import Login from "./pages/login.js";
import { useContext} from "react";
import { AuthContext } from "./context/AuthContext.js";
function App() {
 const {user}=useContext(AuthContext);

  return (
       

   
       <div className="App">
          <Router>
            <Routes>
                  
                  <Route path="/register" element={<Register></Register>}>
                     
                  </Route>
                  <Route path="/login" element={<Login></Login>}>
                     
                  </Route>
                  <Route path="/chat" element={user?<Chat></Chat>:<Login></Login>}>
                  </Route>
                  <Route path="*" element={user ? <Chat></Chat>: <Login></Login> }></Route>
            </Routes>
          </Router>
              
       </div>
        
    
  );
}

export default App;
