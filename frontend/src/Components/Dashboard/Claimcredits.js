import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken, removeUserSession } from '../../Utils/Common';

function Claimcredits() {
    const [description, setDescription] = useState('');
    const [fileOrLink, setFileOrLink] = useState('');
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null);

    let history = useHistory()
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true)
      axios
        .post(`${process.env.REACT_APP_HOST}/upload/doc`, {token: getToken(), doc: fileOrLink, description: description})
        .then((response) => {
          setLoading(false);
          setSuccess(response.data.ok)
          history.push('/dashboard/student')
        })
        .catch((error) => {
          if (error?.response?.status === 401 ) removeUserSession();
          setLoading(false);
          setSuccess(error.response.data.ok)
        });
    };

    if (loading && getToken()) {
        return <> <div className="container">
        <div className="loader" />
      </div> </>;   }
  
    return (
      <form onSubmit={handleSubmit} className="form-container">
        {/* <div className="form-field">
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
          />
        </div> */}
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="fileOrLink">File or Link:</label>
          <input
            type="text"
            id="doc"
            value={fileOrLink}
            onChange={(event) => setFileOrLink(event.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {success && <><small style={{ color: 'green' }}>{success}</small><br /></>}<br />
      </form>
    );
}

export default Claimcredits