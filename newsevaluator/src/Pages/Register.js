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
    const navigate=useNavigate();
    const handlesubmit=(event)=>{
      event.preventDefault();
      console.log(values);
      axios.post('http://localhost:8080/register',values)
      .then(res=>{
        if(res.data.Status==="Success"){
             navigate('/login')
        }else {
          alert("error");
        }
      })
      .then(err=>console.log(err))
    }
  return (
    <div className='register-page'>
      <h1>Register</h1>
    <form onSubmit={handlesubmit}>
        
        <input type="text" placeholder='Username'value={values.name}
    onChange={(event)=>setvalues({...values,name:event.target.value})} required name='name'></input>
    <input type="text" placeholder='Email' value={values.email}
    onChange={(event)=>setvalues({...values,email:event.target.value})} required name='email'></input>
    <input type="password" placeholder='Password' value={values.password}
    onChange={(event)=>setvalues({...values,password:event.target.value})} required name='password'></input>
    <span>already have an account <Link to='/login'>login</Link></span>
    <p>this is a error message</p>
    <button type='submit'>submit</button>
</form>
</div>
  )
}

export default Register