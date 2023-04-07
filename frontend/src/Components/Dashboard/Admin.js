import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../Utils/Common';
import ApprovalTable from './ApprovalTable';

function Admin() {
    const user = getUser();
    
    
    if (user.role === 'student') {
        return <Redirect to={{ pathname: '/dashboard/student' }} />
    }
  return (
    <Switch>
        <Route exact path="/dashboard/admin">
        <ApprovalTable/>
        </Route>
        <Route path="/dashboard/student/profile">
        </Route>
      </Switch>
  )
}

export default Admin