import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './register.scss'
import axios from 'axios'
function Register() {
    const [values,setvalues]=useState({
      name:'',
      email:'',
      password:''
    })
    const [error,seterror]=useState('')
    const navigate=useNavigate();
    const handlesubmit=(event)=>{
      event.preventDefault();
      console.log(values);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,values)
      .then(res=>{
        if(res.data.Status==="Success"){
             navigate('/login')
        }else {
          alert("error");
          seterror(res.data.Error);
          setvalues({name:'',
          email:'',
          password:''});
        }
      })
      .then(err=>console.log(err))
    }
  return (
    <div  className='container-register'>
    <div className='register-page'>
      <h1>Register</h1>
    <form onSubmit={handlesubmit}>
        
        <input type="text" placeholder='Username'value={values.name}
    onChange={(event)=>setvalues({...values,name:event.target.value})} required name='name'></input>
    <input type="text" placeholder='Email' value={values.email}
    onChange={(event)=>setvalues({...values,email:event.target.value})} required name='email'></input>
    <input type="password" placeholder='Password' value={values.password}
    onChange={(event)=>setvalues({...values,password:event.target.value})} required name='password'></input>
    
    <p>{error}</p>
    <button type='submit'>submit</button>
    <span>already have an account <Link to='/login' className='loginnav'>login</Link></span>
</form>
</div>
</div>
  )
}

export default Register