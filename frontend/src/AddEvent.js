import React, { useState } from 'react';
import './AddEvent.css';
import axios from 'axios';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDetails, setEventDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', eventName);
      formData.append('date', eventDate);
      formData.append('details', eventDetails);

      const response = await axios.post('http://192.168.0.204:8000/events/addEvent/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event added successfully:', response.data);

      // Reset the form fields
      setEventName('');
      setEventDate('');
      setEventDetails('');
    } catch (error) {
      console.error('Error occurred while adding event:', error);
    }
  };

  return (
    <div className="addevent-container">
      <h2 className="addevent-title">Add Event</h2>
      <form className="addevent-form" onSubmit={handleSubmit}>
        <div className="addevent-form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="addevent-form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="addevent-form-group">
          <label htmlFor="eventDetails">Event Details:</label>
          <textarea
            id="eventDetails"
            value={eventDetails}
            onChange={(e) => setEventDetails(e.target.value)}
            rows={5}
            required
          ></textarea>
        </div>
        <button type="submit" className="addevent-submit-button">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
