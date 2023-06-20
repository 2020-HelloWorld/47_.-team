import React, { useState } from 'react';
import './Participants.css';

const Participants = () => {
  const participantList = [
    {
      name: 'John Doe',
      srn: '123456789',
      serialNumber: 1,
      position: 'First Place',
    },
    {
      name: 'Jane Smith',
      srn: '987654321',
      serialNumber: 2,
      position: 'Second Place',
    },
    // Add more participants as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredParticipantList = participantList.filter((participant) =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="participants-container">
      <h2 className="participants-title">Participant List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by participant name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table className="participants-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>SRN</th>
            <th>Serial Number</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipantList.map((participant) => (
            <tr key={participant.srn}>
              <td>{participant.name}</td>
              <td>{participant.srn}</td>
              <td>{participant.serialNumber}</td>
              <td>{participant.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Participants;
