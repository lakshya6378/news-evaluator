import React from "react";
import { createContext, useEffect ,useState} from "react";
import axios from 'axios'
import PropType from 'prop-types'
export const Authcontext=createContext();
export const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null)
    const login=async (values)=>{
     const res= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,values)
     if(res.data.Status==="Success")
     setCurrentUser(res.data.Data);
     return res;
    };
    const logout=async ()=>{
     await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`)
     setCurrentUser(null);
     window.location.reload(true);
    };
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser]);
    return <Authcontext.Provider value={{currentUser,login,logout}}>{children}</Authcontext.Provider>
}
AuthContextProvider.propTypes={
    children:PropType.node.isRequired
}