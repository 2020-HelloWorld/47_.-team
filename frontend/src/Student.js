import React, { useState } from 'react';
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

  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleStudentName = () => {
    history.push('./StudentDetails');
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = studentList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="student-container">
      <h2 className="student-title">Student Details</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
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
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <button className="ButtonStyle" onClick={handleStudentName}>
                  {student.name}
                </button>
              </td>
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
