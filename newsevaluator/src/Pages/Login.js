import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Login.scss'; // Import the Sass file
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Login() {
    const [values,setvalues]=useState({
        email:'',
        password:''
      })
      const navigate=useNavigate();
      axios.defaults.withCredentials=true;
      const handlesubmit=(event)=>{
        event.preventDefault();
        console.log(values);
        axios.post('http://localhost:8080/login',values)
        .then(res=>{
          if(res.data.Status==="Success"){
               navigate('/')
          }else {
            alert(res.data.Error);
          }
        })
        .then(err=>console.log(err))
      }

    return (
        <div className='login-page'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}className='login-form'>
                
                <input
                    type="text"
                    className='input-field'
                    placeholder='email'
                    value={values.email}
                    onChange={(event) => setvalues({...values,email:event.target.value})}
                />
                
                <input
                    type="password"
                    className='input-field'
                    placeholder='password'
                    value={values.password}
                    onChange={(event) => setvalues({...values,password:event.target.value})}
                />
                <button type='submit' className='button'>Login</button>
                <p>This is an error message</p>
                <span>Don't have an account? <Link to='/register'>Register</Link></span>
            </form>
            
        </div>
    );
}

export default Login;
