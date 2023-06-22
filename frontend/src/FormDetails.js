import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './FormDetails.css';
import { TARGET_URL } from './Config';

const FormDetails = () => {
  const location = useLocation();
  const { id, name } = location.state;

  const [image, setImage] = useState(null);
  const [report, setReport] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send the file and other data
    const formData = new FormData();
    
    // Add text data to the 'request' field as JSON
    const request = {
      eventid: id,
      cookies: document.cookie,
      details: report,
    };
    formData.append('request', JSON.stringify(request));

    // Add the image file to the 'file' field
    formData.append('file', image);

    try {
      const response = await axios.post(TARGET_URL + '/events/report/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);
      // Handle the response or perform any other actions here
    } catch (error) {
      console.log('Error:', error);
      // Handle the error or display an error message
    }
  };

  return (
    <div className="form-details-container">
      <h2>Form Details</h2>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <label htmlFor="report">Report:</label>
          <textarea id="report" value={report} onChange={handleReportChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormDetails;
