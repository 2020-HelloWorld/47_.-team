import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <body>
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <h2>User Information</h2>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Location: New York</p>
          <button>View previous events</button>
        </div>
        <div className="profile-picture">
          <img src='' alt="Profile" />
        </div>
      </div>
    </div>
    </body>
  );
};

export default Profile;
