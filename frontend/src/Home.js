import React, { useState, useEffect } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TARGET_URL } from './Config';

const Home = () => {
  console.log(document.cookie);
  const history = useHistory();
  const [showEventsButton, setShowEventsButton] = useState(true);
  const [showStudentButton, setShowStudentButton] = useState(false); // Add state for student button visibility

  const handleNav = () => {
    // Navigate to the "Events" page
    history.push('/Events');
    window.location.reload();
  };

  const handleProj = () => {
    // Navigate to the "Project" page
    history.push('/Project');
    window.location.reload();
  };

  const handleClub = () => {
    // Navigate to the "ClubList" page
    history.push('/ClubList');
    window.location.reload();
  };

  const handleStudent = () =>
  {
    history.push('/Student')
    window.location.reload();
  }

  const jsonData = {
    cookies: document.cookie,
  };

  useEffect(() => {
    axios
      .post(TARGET_URL + '/auth', jsonData, {
        withCredentials: true, // Include this option to send cookies
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data['group'] === 'faculties') {
          setShowEventsButton(false);
          setShowStudentButton(true); // Show student button for faculties
        } else {
          console.log('not authenticated');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post(TARGET_URL + '/logout', jsonData, {
        withCredentials: true, // Include this option to send cookies
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          console.log('logged out');
          console.log('removed');
        } else {
          console.log('not authenticated');
        }
      })
      .catch((error) => {
        console.log(error);
      });

    Cookies.remove('sessionid', { path: '/' });
    history.push('/Login');
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          {showEventsButton && (
            <li className="nav-item">
              <button className="ButtonStyle" onClick={handleNav}>
                Events
              </button>
            </li>
          )}
          {showStudentButton && ( // Render student button only if showStudentButton is true
            <li className="nav-item">
              <button onClick={handleStudent} className="ButtonStyle">Student</button>
            </li>
          )}
          <li className="nav-item">
            <button onClick={handleProj} className="ButtonStyle">
              Projects
            </button>
          </li>
          <li className="nav-item">
            <button className="ButtonStyle">Profile</button>
          </li>
          <li className="nav-item">
            <button onClick={handleClub} className="ButtonStyle">
              Club
            </button>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="ButtonStyle">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to My Page!</h1>
      </div>
    </div>
  );
};

export default Home;
