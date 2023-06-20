import React from 'react';
import './EventDetails.css';

const EventDetails = () => {
  const event = {
    id: 1,
    name: 'Event 1',
    date: '2023-06-15',
    status: 'Done',
    type: 'Workshop',
    winners: [
      { position: 1, name: 'John Doe', prizeMoney: '$100' },
      { position: 2, name: 'Jane Smith', prizeMoney: '$50' },
      { position: 3, name: 'Mark Johnson', prizeMoney: '$25' },
      { position: 4, name: 'Emily Davis', prizeMoney: '$10' },
      { position: 5, name: 'Michael Wilson', prizeMoney: '$5' },
    ],
  };

  return (
    <div className="event-details-container">
      <h2 className="event-details-title">Event Details</h2>
      <div className="event-details-card">
        <div className="event-details-info">
          <h3 className="event-details-name">{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Status: {event.status}</p>
          <p>Type: {event.type}</p>
        </div>
        <div className="event-details-winners">
          <h3>Top 5 Winners</h3>
          <ul>
            {event.winners.map((winner) => (
              <li key={winner.position}>
                <span className="winner-position">{winner.position}</span>
                <span className="winner-name">{winner.name}</span>
                <span className="winner-prize">{winner.prizeMoney}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="event-details-upload">
        <h3>Add Images</h3>
        <input type="file" accept="image/*" multiple />
        <button className="ButtonStyle">Upload</button>
      </div>
    </div>
  );
};

export default EventDetails;
