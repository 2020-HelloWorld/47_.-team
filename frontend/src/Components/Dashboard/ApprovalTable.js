import React, { useState } from "react";

function ApprovalTable() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null);
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
    const newData = [...data];
    newData[index].text = event.target.value;
    setData(newData);
  };

  // Handle changes to number input
  const handleNumberChange = (event, index) => {
    const newData = [...data];
    newData[index].number = event.target.value;
    setData(newData);
  };

  // Handle approve button click
  const handleApproveClick = (index) => {
    const newData = [...data];
    newData[index].approved = true;
    setData(newData);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Description</th>
          <th>Document ID</th>
          <th>Text</th>
          <th>Number</th>
          <th>Approve</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.username}</td>
            <td>{item.description}</td>
            <td>{item.document_id}</td>
            <td>
              <input
                type="text"
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
              {!item.approved && (
                <button onClick={() => handleApproveClick(index)}>
                  Approve
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