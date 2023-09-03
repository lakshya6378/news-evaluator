import React, { useContext, useState } from 'react';
import {Link} from "react-router-dom";
import './Login.scss'; // Import the Sass file
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Authcontext } from '../context/Authcontext';
function Login() {
    const [values,setvalues]=useState({
        email:'',
        password:''
      })
      const navigate=useNavigate();
      const {login,currentUser}=useContext(Authcontext);
      console.log(currentUser);
      axios.defaults.withCredentials=true;
      const handlesubmit= async (event)=>{
        event.preventDefault();
        console.log(values);
      
        try {
          const res = await login(values);
          if (res.data.Status === "Success") {
            console.log(res.data.Data)
            navigate('/');
          } else {
            alert(res.data.Error);
          }
        } catch (error) {
          console.log(error);
        }
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
                <span>Don&apos;t have an account? <Link to='/register'>Register</Link></span>
            </form>
            
        </div>
    );
}

export default Login;
