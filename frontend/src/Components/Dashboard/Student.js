import React from 'react'
import { Redirect } from 'react-router-dom';
import { getUser } from '../../Utils/Common';

function Student() {
    console.log(1)
    const user = getUser()      
    if (user.role === 'admin') {
        return <Redirect to={{ pathname: '/dashboard/admin' }} />
    }
    console.log(2)
  return (
    <div>Student</div>
  )
}

export default Student