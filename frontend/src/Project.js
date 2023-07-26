import React, { useEffect, useState } from 'react';
import './Project.css';
import axios from 'axios';
import { TARGET_URL } from './Config';

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

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cookies: document.cookie,
    withCollege:true,
    category:"capstone",
    title: '',
    details: '',
    link: '',
    guide: '',
    department: '',
  });

  const handleAddProject = () => {
    setFormData({
    cookies: document.cookie,
    withCollege:true,
    category:"capstone",
    title: '',
    details: '',
    link: '',
    guide: '',
    department: '',
    });

    setShowForm(true);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(TARGET_URL + '/project/add/',formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Optionally, you can handle the response here
      console.log('Response:', response.data);
  
      // Close the form after submission
      setShowForm(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(TARGET_URL + '/project/list/', {
          cookies: document.cookie,
        });
        console.log(response);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
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

      {/* "Add Project" button */}
      <button className='ButtonStyle' onClick={handleAddProject}>Add Project</button>

      {/* Form for adding a new project */}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="project-form">
          <label>
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Details:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleFormInputChange}
              rows={5}
            />
          </label>
          <label>
            Link:
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Guide:
            <input
              type="text"
              name="guide"
              value={formData.guide}
              onChange={handleFormInputChange}
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleFormInputChange}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      )}

      <table className="project-table">
        <thead>
          <tr>
            <th>Project title</th>
            <th>Abstract</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Git Hub Repo Link</th>
            <th></th>
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
