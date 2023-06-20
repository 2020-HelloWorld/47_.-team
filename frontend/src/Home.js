import React,{ useState} from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const Home = () => {

  console.log(document.cookie)
  const history = useHistory();
  
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

  

  const handleLogout = () => {
    // Navigate to the "Login" page

    const jsonData = {
      cookies:document.cookie,
      type: "logout"
    }
      
      axios.post('https://9f74-223-237-192-186.ngrok-free.app/logout', jsonData, {
        withCredentials: true, // Include this option to send cookies
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
    
       
        if (response.status === 200) {
          console.log("logged out");
          
          console.log("removed");

        }
        else 
        {
          console.log("not authenticated");
          
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
          <li className="nav-item">
            <button className='ButtonStyle' onClick={handleNav}>Events</button>
            </li>
            
          <li className="nav-item"><button onClick={handleProj} className='ButtonStyle'>Projects</button></li>
          <li className="nav-item"><button className='ButtonStyle'>Profile</button></li>
          <li className="nav-item"><button onClick={handleClub}className='ButtonStyle'>Club</button></li>
          <li className="nav-item"><button onClick={handleLogout}className='ButtonStyle'>Logout</button></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to My Page!</h1>
      </div>
  
    </div>
  );
};

export default Home;
