
import React, { useEffect, useState } from 'react';
import './Project.css';

const Project = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectData, setProjectData] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const ProjectData = [
    {
      projectName: 'Project 1',
      details: 'Details 1',
      createdBy: 'Person A',
      status: 'Completed',
    },
    {
      projectName: 'Project 2',
      details: 'Details 2',
      createdBy: 'Person B',
      status: 'In Progress',
    },
    {
      projectName: 'Project 3',
      details: 'Details 3',
      createdBy: 'Person C',
      status: 'Pending',
    },
  ];

  const filteredProjects = ProjectData.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://192.168.15.204:8000/');
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);


  return (
    <div className="project-page">
      <h1 className="title">Projects</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th>$data</th>
            <th>Details</th>
            <th>Created By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectName}</td>
              <td>{project.details}</td>
              <td>{project.createdBy}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
