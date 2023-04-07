import React from "react";
import { getUser, removeUserSession } from "../Utils/Common";
import { Link } from 'react-router-dom'
import "./style.css";

function Navbar({auth, ...props }) {

  const handleLogout = ()=>{
    removeUserSession()
  }
  return (
    <div className="central-body">
     {auth ?
     <>
      {getUser().role==="student" ?
   
      <nav>
      <ul>
        Ed-Cred
      </ul>
      <ul>
        <li>
          <a href="/">Profile</a>
        </li>
        <li>
          <a href="/">Freelance</a>
        </li>
        <li>
          <Link to="/claim">Claim</Link>
        </li>
        <li>
        <Link to="/" onClick={handleLogout} >Logout</Link>
        </li>
      </ul>
    </nav>
      :
      <nav>
      <ul>
        Ed-Cred
      </ul>
      <ul>
        <li>
          <a href="/">Profile</a>
        </li>
        <li>
          <a href="/">Freelance</a>
        </li>
        <li>
          <a href="/">Claim</a>
        </li>
        <li>
        <Link to="/" onClick={handleLogout} >Logout</Link>
        </li>
      </ul>
    </nav>
     }
      </>
      :
      <></>
     }
</div>
  );
}

export default Navbar;
