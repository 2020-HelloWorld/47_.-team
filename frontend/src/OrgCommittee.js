import React, { useState } from 'react';
import './OrgCommittee.css';

const OrgCommittee = () => {
  const committeeMembers = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Organiser',
      email: 'johndoe@example.com',
      srn: 'PES1UG20CS143',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Volunteer',
      email: 'janesmith@example.com',
      srn: 'PES1UG20CS143',
    },
    {
      id: 3,
      name: 'Mark Johnson',
      position: 'Domain Head',
      email: 'markjohnson@example.com',
      srn: 'PES1UG20CS143',
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'Club Head',
      email: 'emilydavis@example.com',
      srn: 'PES1UG20CS143',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCommitteeMembers = committeeMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="org-committee-container">
      <h2 className="org-committee-title">Organizing Committee</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by member name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table className="org-committee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>SRN</th>
          </tr>
        </thead>
        <tbody>
          {filteredCommitteeMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.position}</td>
              <td>{member.email}</td>
              <td>{member.srn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgCommittee;
