import React, { useState, useEffect } from 'react';
import './ClubEventList.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ClubEventList = () => {
  const [modifyButtonVisible, setModifyButtonVisible] = useState(false);
  const [participantButtonVisible, setParticipantButtonVisible] = useState(false);
  const [facultyButtonVisible, setFacultyButtonVisible] = useState(false);
  const [addEventButtonVisible, setAddEventButtonVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();
  const handleAddEvent = () => {
    history.push('/AddEvent');
    window.location.reload();
  };

  const handleEventDetails = () => {
    history.push('/EventDetails');
    window.location.reload();
  };

  const handleParticipants = () => {
    history.push('/Participants');
    window.location.reload();
  };

  const handleOrgCommittee = () => {
    history.push('/OrgCommittee');
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

  useEffect(() => {
    const jsonData = {
      cookies: document.cookie,
    };

    axios
      .post('https://9f74-223-237-192-186.ngrok-free.app/auth', jsonData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          console.log('verified');
          if (response.data['group'] === 'clubs') {
            setModifyButtonVisible(true);
            setAddEventButtonVisible(true);
            setParticipantButtonVisible(true);
            setFacultyButtonVisible(true);
          } else if (
            response.data['group'] === 'faculties' ||
            response.data['group'] === 'student'
          ) {
            setParticipantButtonVisible(true);
          }
          if (response.data['group'] === 'faculty') {
            setFacultyButtonVisible(true);
          }
        } else {
          console.log('not verified');
        }
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEventList = eventList.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clubeventlist-container">
      <h2 className="clubeventlist-title">Club Event List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by event name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
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
          {filteredEventList.map((event) => (
            <tr key={event.id}>
              <td>
                <button onClick={handleEventDetails} className="ButtonStyle">
                  {event.name}
                </button>
              </td>
              <td>{event.date}</td>
              <td>{event.status}</td>
              <td>{event.type}</td>
              <td>
                {participantButtonVisible && (
                  <button onClick={handleParticipants} className="ButtonStyle">
                    Participants
                  </button>
                )}
              </td>
              <td>
                {facultyButtonVisible && (
                  <button onClick={handleOrgCommittee} className="ButtonStyle">
                    Organising Committee
                  </button>
                )}
              </td>
              <td>
                {modifyButtonVisible && (
                  <button className="ButtonStyle">Modify</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-event-container">
        {addEventButtonVisible && (
          <button onClick={handleAddEvent} className="ButtonStyle">
            Add Event
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubEventList;
