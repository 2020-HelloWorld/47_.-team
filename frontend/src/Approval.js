import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './Approval.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Approval = () => {
  const [clubEvents, setClubEvents] = useState([]);
  const [extraEvents, setExtraEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        cookies: document.cookie,
      };

      try {
        const response = await axios.post(TARGET_URL + '/events/approvals/get/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response);
        setClubEvents(response.data['clubEvents']);
        setExtraEvents(response.data['extraEvents']);
      } catch (error) {
        console.log('Error:', error);
      }

      try {
        const response = await axios.post(TARGET_URL + '/project/approval/list/', {
          cookies: document.cookie,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response:', response);
        setClubEvents(response.data['clubEvents']);
        setExtraEvents(response.data['extraEvents']);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBack = () => {
    setSelectedImage(null);
  };

  const history = useHistory();

  const handleEventDetails = (event) => {
    history.push('/EventDetails', { event });
    window.location.reload();
  };

  const handleClubname = (event, clubId) => {
    history.push('/ClubEventList', { club: { id: event.clubId, name: event.clubName } });
    window.location.reload();
  };

  const handleStudentName = (srn) => {
    history.push({
      pathname: './StudentDetails',
      state: { srn: srn },
    });
    window.location.reload();
  };

  const handleEventApproval = async (eventId, approved) => {
    try {
      const response = await axios.post(
        TARGET_URL + '/project/approval/',
        {
          cookies: document.cookie,
          eventid: eventId,
          result: approved,

          cookies: document.cookie,
          //id:
          approval:approved,
          //completion:True/False/None
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('POST request successful:', response);
      // Handle the response as needed
      window.location.reload();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="approval-container">
      <h2 className="HTWO">Approval Page</h2>
      {/* Removed the "Attendance Request" button */}
      <table className="club-events-table">
        <caption className="HTWO">Club Event Approvals</caption>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Club Name</th>
            <th>Club ID</th>
            <th>Date</th>
            <th>Details</th>
            <th>Event ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clubEvents.map((event) => (
            <tr key={event.id}>
              <td>
                <button className="ButtonStyle" onClick={() => handleEventDetails(event)}>
                  {event.name}
                </button>
              </td>

              <td>
                <button className="ButtonStyle" onClick={() => handleClubname(event)}>
                  {event.clubName}
                </button>
              </td>
              <td className="tddd">{event.clubId}</td>
              <td>{event.date}</td>
              <td>{event.details}</td>
              <td>{event.id}</td>
              <td className="approval-buttons">
                <button className="approve-button" onClick={() => handleEventApproval(event.id, true)}>
                  Accept
                </button>
                <button className="reject-button" onClick={() => handleEventApproval(event.id, false)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="extra-events-table">
        <caption className="HTWO">capstone Event Approvals</caption>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event ID</th>
            <th>Date</th>
            <th>Student Name</th>
            <th>Student SRN</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {extraEvents.map((event) => (
            <tr key={event.id}>
              <td>
                <button className="ButtonStyle" onClick={() => handleEventDetails(event)}>
                  {event.name}
                </button>
              </td>
              <td>{event.id}</td>
              <td>{event.date}</td>
              <td>
                <button className="ButtonStyle" onClick={() => handleStudentName(event.srn)}>
                  {event.student}
                </button>
              </td>
              <td>{event.srn}</td>
              <td>{event.details}</td>
              <td className="approval-buttons">
                <button className="approve-button" onClick={() => handleEventApproval(event.id, true)}>
                  Accept
                </button>
                <button className="reject-button" onClick={() => handleEventApproval(event.id, false)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Approval;
