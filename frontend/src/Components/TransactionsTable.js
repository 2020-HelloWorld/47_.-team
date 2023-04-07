import React from "react";

function TransactionTable({ transactions }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>ID</th>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>Sender</th>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>Receiver</th>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>Coin</th>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>Coin Type</th>
          <th style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left", padding: "8px" }}>Time</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent" }}>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.doc_id}</td>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.sender}</td>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.recipient}</td>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.amount}</td>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.token_type}</td>
            <td style={{ textAlign: "left", padding: "8px" }}>{transaction.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
