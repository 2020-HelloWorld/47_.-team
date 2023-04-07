import React from "react";
import { getUser } from "../Utils/Common";
import "./style.css";

function Navbar({auth, ...props }) {

  const handleLogout = ()=>{
    console.log(23)
  }
  return (
    <div className="central-body">
     {auth ?
     <>
      {getUser().role==="student" ?
   
    <div className="nav">
        <div className="nav-header">
          <div className="nav-title">
            Ed-Cred
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div className="nav-links">
            <a href="/" >Transact</a>
        
          <a href="/" >My profile</a>
          <a href="/" >Contact </a>
          <a href="/" onClick={handleLogout} >Logout</a>

        </div>
      </div>
      :
      <div className="nav">
        <div className="nav-header">
          <div className="nav-title">
            Ed-Cred
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div className="nav-links">
            <a href="/" >AdminMenu1</a>
        
          <a href="/" >My profile</a>
          <a href="/" >Contact </a>
          <a href="/" >Logout</a>

        </div>
      </div>
     }
      </>
      :
      <></>
     }
</div>
  );
}

export default Navbar;
