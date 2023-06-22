import React, { useEffect, useState } from 'react';
import './EventDetails.css';
import axios from 'axios';
import { TARGET_URL } from './Config';

const EventDetails = (props) => {
  const { event } = props.location.state;
  const [report, setReport] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const jsonData = {
      cookies: document.cookie,
    };

    axios
      .post(TARGET_URL + '/auth', jsonData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          console.log('verified');
          if (response.data['group'] === 'clubs') {
            setShowUpload(true);
            console.log('clubs');
          }
        } else {
          console.log('not verified');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleUpload = () => {
    // Handle image upload logic here
  };

  return (
    <div className="event-details-container">
      <h2 className="event-details-title">Event Details</h2>
      <div className="event-details-card">
        <div className="event-details-info">
          <h3 className="event-details-name">{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Details: {event.details}</p>
        </div>
      </div>
      {/* <div className="report-container">
        <h3>Report</h3>
        <textarea
          value={report}
          onChange={handleReportChange}
          placeholder="Enter report..."
          className="report-textarea"
        ></textarea>
      </div> */}
      
      {/* <div className="event-details-upload">
        <h3>Add Images</h3>
        <input type="file" accept="image/*" multiple />
        <button className="ButtonStyle" onClick={handleUpload}>
          Upload
        </button>
      </div> */}
      
    </div>
  );
};

export default EventDetails;
