import React from 'react';
import './Student.css';
import { useHistory } from 'react-router-dom';

const Student = () => {
  const studentList = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'PES1UG20CS001',
      department: 'Computer Science',
      year: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: 'PES1UG20CS002',
      department: 'Computer Science',
      year: 2,
    },
    // Add more student details as needed
  ];

  const history = useHistory();
  const handleStudentName =() => {
    history.push('./StudentDetails');
    window.location.reload();
  }

  return (
    <div className="student-container">
      <h2 className="student-title">Student Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td><button className='ButtonStyle' onClick={handleStudentName}>{student.name}</button></td>
              <td>{student.rollNumber}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
