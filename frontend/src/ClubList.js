import React from 'react';
import './ClubList.css';
import { useHistory } from 'react-router-dom';

const ClubList = () => {
  const clubsData = [
    {
      clubName: 'Club 1',
      clubHead: 'Head A',
      facultyInCharge: 'Faculty A',
    },
    {
      clubName: 'Club 2',
      clubHead: 'Head B',
      facultyInCharge: 'Faculty B',
    },
    {
      clubName: 'Club 3',
      clubHead: 'Head C',
      facultyInCharge: 'Faculty C',
    },
    // Add more club data as needed
  ];


  const history = useHistory()
  const handleClubEventList = () =>
  {
    history.push('/ClubEventList');
    window.location.reload();
  }

  return (
    <div className="clublists-container">
      <h2 className="clublists-title">Club Lists</h2>
      <table className="clublists-table">
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Club Head</th>
            <th>Faculty in Charge</th>
          </tr>
        </thead>
        <tbody>
          {clubsData.map((club, index) => (
            <tr key={index}>
              <td><button className='ButtonStyle' onClick={handleClubEventList}>{club.clubName}</button></td>
              <td>{club.clubHead}</td>
              <td>{club.facultyInCharge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubList;
