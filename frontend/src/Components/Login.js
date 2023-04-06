import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { setUserSession } from '../Utils/Common';

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
      axios.post(`${process.env.REACT_APP_HOST}/login`, { username: e.target.username.value, password: e.target.password.value }).then(response => {
        setLoading(false);
        setUserSession(response.data?.token, response.data?.username, response.data?.name);
        isLogged(true)
        props.history.push('/dashboard');
      }).catch(error => {
        setLoading(false);
        console.log(error.response?.data)
        if (error.response?.status === 401) setError(error.response?.data.error);
        else setError("Something went wrong. Please try again later.");
      });
    }
    if (loading) {
  return <> Loading </>;  }
  
    return (
      <div>  
      <form onSubmit={handleLogin} className='glass-container login'>
          <h3 className='brand-titl'>Ed-Cred</h3>
  
          <label className="inputLabel">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" autoComplete="new-password" />
  
          <label className="inputLabel">Password</label>
          <input type="password" placeholder="Password" id="password" autoComplete="new-password" />
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="submit" value={loading ? 'Loading...' : 'LOGIN'}  disabled={loading} />
          
      </form>
      </div>
    );
}

export default Login