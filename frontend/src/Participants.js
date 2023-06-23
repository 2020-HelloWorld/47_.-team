import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './Participants.css';

const Participants = () => {
  const location = useLocation();
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [participantList, setParticipantList] = useState([]);
  const [newParticipantSRN, setNewParticipantSRN] = useState('');
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { eventId, eventName } = location.state;
      setEventId(eventId);
      setEventName(eventName);
      fetchData(eventId);
    }
  }, [location.state]);

  const fetchData = async (eventId) => {
    try {
      const response = await axios.post(
        TARGET_URL + '/events/participant/get/',
        {
          cookies: document.cookie,
          eventid: eventId,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setParticipantList(response.data.participants);
      } else {
        console.log('Failed to fetch participants');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAddParticipant = () => {
    setShowAddParticipant(true);
  };

  const handleSaveParticipant = () => {
    if (newParticipantSRN.trim() !== '') {
      const newParticipant = {
        srn: newParticipantSRN,
        name: 'John Doe', // Replace with actual participant name
      };
      setParticipantList((prevList) => [...prevList, newParticipant]);
      setNewParticipantSRN('');
      setShowAddParticipant(false);

      const data = {
        cookies: document.cookie,
        eventid: eventId,
        srn: newParticipantSRN,
      };

      axios
        .post(TARGET_URL + '/events/participant/add/', data)
        .then((response) => {
          console.log('POST request successful:', response.data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  return (
    <div>
      <h2 className='htwo'>Participants</h2>
      <h3 className='hthree'>Event ID: {eventId}</h3>
      <h3 className='hthree'>Event Name: {eventName}</h3>
      <table className="participants-table">
        <thead>
          <tr>
            <th>SRN</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {participantList && participantList.length > 0 ? (
            participantList.map((participant, index) => (
              <tr key={index}>
                <td>{participant.srn}</td>
                <td>{participant.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No participants found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {showAddParticipant ? (
          <div>
            <input
              type="text"
              placeholder="Participant SRN"
              value={newParticipantSRN}
              onChange={(e) => setNewParticipantSRN(e.target.value)}
            />
            <button className="ButtonStyle" onClick={handleSaveParticipant}>
              Save Participant
            </button>
          </div>
        ) : (
          <button className="ButtonStyle" onClick={handleAddParticipant}>
            Add Participant
          </button>
        )}
      </div>
    </div>
  );
};

export default Participants;
