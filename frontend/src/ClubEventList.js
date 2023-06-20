import React from 'react';
import './ClubEventList.css';
import { useHistory } from 'react-router-dom';

const ClubEventList = () => {

  const history = useHistory();
  const handleAddEvent = () => {
    // Navigate to the "Login" page
    history.push('/AddEvent');
    window.location.reload();
  };


  const eventList = [
    {
      id: 1,
      name: 'Event 1',
      date: '2023-06-15',
      status: 'Done',
      type: 'Workshop',
    },
    {
      id: 2,
      name: 'Event 2',
      date: '2023-07-10',
      status: 'Ongoing',
      type: 'Seminar',
    },
    {
      id: 3,
      name: 'Event 3',
      date: '2023-08-05',
      status: 'Upcoming',
      type: 'Conference',
    },
  ];

 

  return (
    <div className="clubeventlist-container">
      <h2 className="clubeventlist-title">Club Event List</h2>
      <table className="clubeventlist-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.status}</td>
              <td>{event.type}</td>
              <td>
                <button className="ButtonStyle">Participants</button>
              </td>
              <td>
                <button className="ButtonStyle">Organising Committee</button>
              </td>
              <td>
                <button className="ButtonStyle">Modify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-event-container">
        <button onClick={handleAddEvent} className="ButtonStyle">Add Event</button>
      </div>
    </div>
  );
};

export default ClubEventList;
