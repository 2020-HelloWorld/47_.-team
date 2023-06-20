import React, { useState } from 'react';
import './Events.css';
import { useHistory } from 'react-router-dom';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const history = useHistory();
  const handleEventDetails = () => {
    // Navigate to the "Login" page
    history.push('/EventDetails');
    window.location.reload();
  };
  

  const eventsData = [
    {
      eventName: 'Event 1',
      approvedBy: 'Person A',
      position: 'Position 1',
    },
    {
      eventName: 'Event 2',
      approvedBy: 'Person B',
      position: 'Position 2',
    },
    {
      eventName: 'Event 3',
      approvedBy: 'Person C',
      position: 'Position 3',
    },
    // Add more events as needed
  ];

  const filteredEvents = eventsData.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <th>Signed and Approved By</th>
            <th>Position</th>
      
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td><button className='ButtonStyle' onClick={handleEventDetails}>{event.eventName}</button></td>
              <td>{event.approvedBy}</td>
              <td>{event.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Events;
