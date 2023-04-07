import React, { useState } from "react";
import { useEffect } from "react";
import { getToken, removeUserSession } from "../../Utils/Common";
import axios from "axios";

function ApprovalTable() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null);
    const [appList , setAppList] = useState(null)

  // Set up some initial data
  const initialData = [
    {
      username: "JohnDoe",
      description: "Lorem ipsum dolor sit amet",
      document_id: "DOC001",
      text: "",
      number: "",
      approved: false
    },
    {
      username: "JaneDoe",
      description: "Consectetur adipiscing elit",
      document_id: "DOC002",
      text: "",
      number: "",
      approved: false
    }
  ];

  // Set up state for the table data
  const [data, setData] = useState(initialData);

  // Handle changes to text input
  const handleTextChange = (event, index) => {
    const newData = [...appList];
    newData[index].$G = event.target.value;
    setData(newData);
  };

  // Handle changes to number input
  const handleNumberChange = (event, index) => {
    const newData = [...appList];
    newData[index].$S = event.target.value;
    setData(newData);
  };

  // Handle approve button click
  const handleApproveClick = (index,id) => {
    const newData = [...appList];
    
    axios
      .post(`${process.env.REACT_APP_HOST}/approve/application`, {token: getToken(), id: id, $G: newData[index].$G, $S:newData[index].$S , doc_id: newData[index].doc, recipient:newData[index].username})
      .then((response) => {
        newData[index].status = 'accepted';
        setData(newData);
      })
      .catch((error) => {
        if (error?.response?.status === 401 ) removeUserSession();
        setAppList( null );
      });
      return () => {
      }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_HOST}/fetch/approvaldata`, {token: getToken()})
      .then((response) => {
        setLoading(false);
        setAppList( response.data.appData );
      })
      .catch((error) => {
        if (error?.response?.status === 401 ) removeUserSession();
        setLoading(false);
        setAppList( null );
      });
      return () => {
      }
  }, []);

if (loading && getToken()) {
  return <> <div className="container">
<div className="loader" />
</div> </>;   }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Description</th>
          <th>Document ID</th>
          <th>$G</th>
          <th>$S</th>
          <th>Approve</th>
        </tr>
      </thead>
      <tbody>
        {appList && appList.map((item, index) => (
          <tr key={index}>
            <td>{item.username}</td>
            <td>{item.description}</td>
            <td>{item.doc}</td>
            <td>
              <input
                type="number"
                value={item.text}
                onChange={(event) => handleTextChange(event, index)}
              />
            </td>
            <td>
              <input
                type="number"
                value={item.number}
                onChange={(event) => handleNumberChange(event, index)}
              />
            </td>
            <td>
              {item.status==="pending" && (
                <button onClick={() => handleApproveClick(index,item._id)}>
                  Approved
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

              }
export default ApprovalTable;