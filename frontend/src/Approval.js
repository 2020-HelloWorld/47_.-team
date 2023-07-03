import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './Approval.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Approval = () => {
  const [declarations, setDeclarations] = useState([]);
  const [clubEvents, setClubEvents] = useState([]);
  const [extraEvents, setExtraEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(TARGET_URL + '/attendance/declaration/get/', {
          cookies: document.cookie,
        });

        console.log('POST request successful:', response);
        setDeclarations(response.data['declaration']);
      } catch (error) {
        console.log('Error:', error);
      }

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
    };

    fetchData();
  }, []);

  const handleDeclarationApproval = async (id, approved) => {
    try {
      const response = await axios.post(TARGET_URL + '/attendance/declaration/sign/', {
        cookies: document.cookie,
        result: approved,
        id: id,
      });
      

      console.log('POST request successful:', response);
      // Handle the response as needed
      window.location.reload();
    } catch (error) {
      console.log('Error:', error);
    }
    
    
    
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBack = () => {
    setSelectedImage(null);
  };

  const history = useHistory();
  const handleStudentDetails = (srn) => {
    history.push('/StudentDetails', { srn });
    window.location.reload();
  };

  const handleEventDetails = (event) =>
  {
    history.push('/EventDetails',{event});
    window.location.reload();
  }
  const handleClubname =(event,clubId) =>
  {
    history.push('/ClubEventList',{club: {id : event.clubId, name: event.clubName}});
    window.location.reload();
  }
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
          TARGET_URL + '/events/approval/',
          {
            cookies: document.cookie,
            eventid: eventId,
            result: approved,
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
      <h2 className='HTWO'>Approval Page</h2>
      <h2 className='HTWO'><button onClick={() => history.push('/AttendanceApproval')} className='ButtonStyle'>View Attendance requests</button></h2>
      {selectedImage ? (
        <div className="enlarged-image-container">
          <img
            src={TARGET_URL + selectedImage}
            alt="Enlarged Document"
            className="enlarged-image"
          />
          <button className="button-style" onClick={handleBack}>
            Back
          </button>
        </div>
      ) : (
        <>
          <table className="declaration-table">
            <caption className='HTWO'>Declaration Form Approvals</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>SRN</th>
                <th>ID</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {declarations.map((declaration) => (
                <tr key={declaration.id}>
                  <td>
                    <button className="button-style" onClick={() => handleStudentDetails(declaration.srn)}>
                      {declaration.name}
                    </button>
                  </td>
                  <td>{declaration.srn}</td>
                  <td>{declaration.id}</td>
                  <td>
                    <img
                      src={TARGET_URL + declaration.doc}
                      alt="Document"
                      className="declaration-image"
                      onClick={() => handleImageClick(declaration.doc)}
                    />
                  </td>
                  <td className="approval-buttons">
                    <button className="approve-button" onClick={() => handleDeclarationApproval(declaration.id, true)}>
                      Accept
                    </button>
                    <button className="reject-button" onClick={() => handleDeclarationApproval(declaration.id, false)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="club-events-table">
            <caption className='HTWO'>Club Event Approvals</caption>
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
                  <td><button className='ButtonStyle' onClick={() => handleEventDetails(event)}>{event.name}</button></td>
                  
                  <td><button className='ButtonStyle' onClick={() => handleClubname(event)}>{event.clubName}</button></td>
                  <td className='tddd'>{event.clubId}</td>
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
            <caption className='HTWO'>Extra Event Approvals</caption>
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
                  <td><button className='ButtonStyle' onClick={() => handleEventDetails(event)}>{event.name}</button></td>
                  <td>{event.id}</td>
                  <td>{event.date}</td>
                  <td><button className='ButtonStyle' onClick={() => handleStudentDetails(event.srn)}>{event.student}</button></td>
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
        </>
      )}
    </div>
  );
};

export default Approval;
