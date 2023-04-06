// eslint-disable-next-line
import { BrowserRouter, Switch, Route } from "react-router-dom";
import  { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Components/Home";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import "./App.css";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_HOST}/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.username, response.data.name);
        setAuthLoading(false);
        setAuth(true);
      })
      .catch((error) => {
        if (error?.response?.status === 401 ) removeUserSession();
        setAuthLoading(false);
        setAuth(false);
      });
      return () => {
      }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar  auth={auth} 
          setAuth={setAuth}
          setAuthLoading={setAuthLoading}
           />
          <div className="content">
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={Home}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
              />
         
              <PublicRoute
                path="/login"
                component={Login}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
              />

              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
