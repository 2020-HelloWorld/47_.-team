import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { setUserSession } from '../Utils/Common';
import '../Components/style.css';

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, ...props}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const isLogged = useCallback((val) => {
            hasAuthLoading(!val);
            hasAuth(val);
          },
          [hasAuth,hasAuthLoading],
        );
  
    // handle button click of login form
    const handleLogin = (e) => {   
      setError(null);
      setLoading(true);
      // console.log(e.target);
      axios.post(`${process.env.REACT_APP_HOST}/login`, { username: e.target.username.value, password: e.target.password.value }).then(response => {
        setLoading(false);
        setUserSession(response.data?.token, response.data?.user.username, response.data?.user.name,response.data?.user.role);
        isLogged(true)
        props.history.push('/dashboard');
      }).catch(error => {
        setLoading(false);
        console.log(error.response?.data)
        console.log(error.response?.data.error)
        if (error.response?.status === 401) setError(error.response?.data.message);
        else setError("Something went wrong. Please try again later.");
      });
    }
    if (loading) {
  return <> <div className="container">
  <div className="loader" />
</div> </>;  }
  
    return (
      <div>  
      

      <div className="container">
      <div className="login-page">
      <div className="form-container">
        <form className={`login-form active-form}`} onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>
            Username
            <input type="text" id='username' />
          </label>
          <label>
            Password
            <input type="password"  id='password'/>
          </label>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="submit" value={loading ? 'Loading...' : 'LOGIN'}  disabled={loading}  className="submit"/>
        </form>
        
      </div>
    </div>
    </div>
    </div>
    );
}

export default Login