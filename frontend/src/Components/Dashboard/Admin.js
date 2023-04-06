import React from 'react'
import { Redirect } from 'react-router-dom';
import { getUser } from '../../Utils/Common';

function Admin() {
    const user = getUser();     
    if (user.role === 'student') {
        return <Redirect to={{ pathname: '/dashboard/student' }} />
    }
  return (
    <div>Admin</div>
  )
}

export default Admin