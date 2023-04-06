import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { setUserSession } from '../Utils/Common';
import '../Components/style.css';

function Login({setAuth: hasAuth, setAuthLoading: hasAuthLoading, ...props}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };
  
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
  return <> <div className="container">
  <div className="loader" />
</div> </>;  }
  
    return (
      <div>  
      

      <div className="container">
      <div className={`cont ${isSignIn ? 's--signup' : ''}`}>
        <div className="form sign-in">
          <h2>Welcome to Ed-Cred</h2>
          <form onSubmit={handleLogin}>
            <label>
              <span>Email</span>
              <input type="email" className='input'/>
            </label>
            <label>
              <span>Password</span>
              <input type="password" className='input'/>
            </label>
            <p className="forgot-pass">Forgot password?</p>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="submit" value={loading ? 'Loading...' : 'LOGIN'}  disabled={loading}  className="submit"/>
          </form>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div className="img__text m--in">
              <h3>If you already have an account, just sign in.</h3>
            </div>
            <div className="img__btn" onClick={handleToggleForm}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Create your Account</h2>
            <form > 
            {/* onSubmit={handleSubmit} */}
              <label>
                <span>Name</span>
                <input type="text" className='input'/>
              </label>
              <label>
                <span>Email</span>
                <input type="email" className='input'/>
              </label>
              <label>
                <span>Password</span>
                <input type="password" className='input'/>
              </label>
              <input type='submit' value="submit" className='submit'></input>
            </form>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
}

export default Login