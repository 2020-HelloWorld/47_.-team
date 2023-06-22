import React from 'react';
import './StudentDetails.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const StudentDetails = () => {
  const eventsList = [
    'Event 1',
    'Event 2',
    'Event 3',
    // Add more events as needed
  ];

  const gpa = 3.8;
  const attendance = 90;

  const history = useHistory();
  const handleStudentEvent = () =>
  {
    history.push('./EventDetails');
    window.location.reload();
  }

  return (
    <div className="student-details-container">
      <h2 className="student-details-title">Student Details</h2>
      <div className="student-details-info">
        <p>
          GPA: <span className="student-details-value">{gpa}</span>
        </p>
        <p>
          Attendance: <span className="student-details-value">{attendance}%</span>
        </p>
      </div>
      <div className="student-details-events">
        <h3>Events List</h3>
        <table className="student-details-events-table">
          <tbody>
            {eventsList.map((event, index) => (
              <tr key={index}>
                <td><button className='ButtonStyle' onClick={handleStudentEvent}>{event}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
