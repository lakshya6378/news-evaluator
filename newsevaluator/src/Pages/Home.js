import React,{useEffect,useState} from 'react'
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
function Home() {
  const [auth,setauth]=useState(false);
    const [message,setmessage]=useState('');
    const [name,setname]=useState('');
    axios.defaults.withCredentials=true;
    const navigate=useNavigate();
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
    const handleDelete=()=>{
      axios.get('http://localhost:8080/logout')
      .then(
        res=>{
          window.location.reload(true);
        }
      ).catch(err=>console.log(err))
    }
  return (
    <div>
        {
            auth ?
            <div>
                <h3>You are authorized  {name}</h3>
                <button onClick={handleDelete}>Logout</button>
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

export default Home