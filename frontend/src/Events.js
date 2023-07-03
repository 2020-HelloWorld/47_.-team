import React, { useState, useEffect } from 'react';
import './Events.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventsData, setEventsData] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const history = useHistory();

  const handleEventDetails = (event) => {
    // Navigate to the "EventDetails" page
    history.push('/EventDetails', { event: event });
    window.location.reload();
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.post(TARGET_URL + '/events/get/', {
          cookies: document.cookie,
        });
        setEventsData(response.data.events);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchEventsData();
  }, []);

  const filteredEvents = eventsData.filter(
    (event) =>
      event.name &&
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOutsideEvent = () =>
  {
    history.push('/AddOutsideEvent');
    window.location.reload();
  }

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td>
                <button
                  className="ButtonStyle"
                  onClick={() => handleEventDetails(event)}
                >
                  {event.name}
                </button>
              </td>
              <td>{event.date}</td>
              <td>{event.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
      <button className='ButtonStyle' onClick={handleAddOutsideEvent}> Add outside event</button>
      </div>
    </div>
    
  );
};

export default Events;
