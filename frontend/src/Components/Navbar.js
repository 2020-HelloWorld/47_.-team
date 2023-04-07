import React from "react";
import "./style.css";

function Navbar() {
  return (
    <div class="central-body">
        
    <div class="nav">
        <div class="nav-header">
          <div class="nav-title">
            Ed-Cred
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div class="nav-links">
            <a href="/" >Transact</a>
        
          <a href="/" >My profile</a>
          <a href="/" >Contact </a>
          <a href="/" >Logout</a>

        </div>
      </div>
     
</div>
  );
}

export default Navbar;
