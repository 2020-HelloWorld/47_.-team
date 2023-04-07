import React from 'react'
import { getToken, getUser } from '../../Utils/Common';
import Student from './Student';
import Admin from './Admin';
import {  Redirect, Route, Switch } from 'react-router-dom';

function Dashboard({ authLoading }) {
    const userRole = getUser()?.role

    if (authLoading && getToken()) {
        return <>Loading</>;  }
  return (
    <>
    {/* <div>Dashboard</div> */}
    <Switch>
        <Route exact path="/dashboard">
          {userRole === 'admin' ? (
            <Redirect to="/dashboard/admin" />
          ) : (
            <Redirect to="/dashboard/student" />
          )}
        </Route>
        <Route path="/dashboard/admin">
          <Admin />
        </Route>
        <Route path="/dashboard/student">
          <Student />
        </Route>
      </Switch>
  </>
  )
}

export default Dashboard