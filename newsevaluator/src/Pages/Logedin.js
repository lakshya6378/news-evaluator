import React,{useEffect,useState} from 'react'
import { Link} from 'react-router-dom';
import axios from 'axios';

function Logedin() {
    const [auth,setauth]=useState(false);
    const [message,setmessage]=useState('');
    const [name,setname]=useState('');
    axios.defaults.withCredentials=true;
    useEffect(()=>{
        axios.get('http://localhost:8080')
        .then(res=>{
          if(res.data.Status==="Success"){
            setauth(true)
            setname(res.data.name);
               

          }else {
            setauth(false)
            setmessage(res.data.Error)
          }
        })
        .then(err=>console.log(err))
    },[]);
  return (
    <div>
        {
            auth ?
            <div>
                <h3>You are authorized  {name}</h3>
                <button>Logout</button>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>login Now</h3>
                <Link to='/login'>Login</Link>
            </div>
        }
    </div>
  )
}

export default Logedin