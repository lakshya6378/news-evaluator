import React,{/*useContext, useEffect,useState*/} from 'react'
//import { Link} from 'react-router-dom';
//import axios from 'axios';
// import { Authcontext } from '../context/Authcontext';
import Fileuploader from '../components/Fileuploader';
import Navbar from '../components/Navbar';
import Instructions from '../components/Instructions';
import Tutorials from '../components/Tutorials';
import NewsSearcher from '../components/NewsSearcher';
import ImageNewsseacher from '../components/ImageNewsseacher';
function Home() {
  // const [auth,setauth]=useState(false);
  //    const [message,setmessage]=useState('');
  //   const [name,setname]=useState('');
  //   axios.defaults.withCredentials=true;
  //   const {logout}=useContext(Authcontext)
  //   useEffect(()=>{
  //       axios.get('http://localhost:8080')
  //       .then(res=>{
  //         if(res.data.Status==="Success"){
  //           setauth(true)
  //           setname(res.data.name);
               

  //         }else {
  //           setauth(false)
  //           setmessage(res.data.Error)
  //         }
  //       })
  //       .then(err=>console.log(err))
  //   },[]);

  return (
    <div >
  <Navbar pos="fixed"></Navbar>
        {/* {
            auth ?
            <div>
                <h3>You are authorized  {name}</h3>
                <button onClick={logout}>Logout</button>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <h3>login Now</h3>
                <Link to='/login'>Login</Link>
            </div>
        } */}
        <div className=" search-bar-container" style={{display:'flex',flexDirection:'column',gap:'4px',alignItems:'center',justifyContent:'center'}}>
        <NewsSearcher/>
        <ImageNewsseacher/> 
        </div>
        <div className='color-line'></div>
        <Fileuploader/> 
        <Instructions/>
        <Tutorials/>
    </div>
  )
}

export default Home