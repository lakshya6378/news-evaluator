import { createContext, useEffect ,useState} from "react";
import axios from 'axios'
export const Authcontext=createContext();
export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null)
    const login=async (values)=>{
     const res= await axios.post('http://localhost:8080/login',values)
     setCurrentUser(res.data.Data);
     return res;
    };
    const logout=async ()=>{
     await axios.get('http://localhost:8080/logout')
     setCurrentUser(null);
     window.location.reload(true);
    };
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser]);
    return <Authcontext.Provider value={{currentUser,login,logout}}>{children}</Authcontext.Provider>
}