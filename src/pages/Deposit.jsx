import "../App.css";
import { useEffect, useState } from "react";


export default function Deposit({ setPage }) {
  const [deposit, setDeposit] = useState(null);
const [price, setPrice] = useState("");
useEffect(() => {
  const stored = localStorage.getItem("deposit");
  if (stored) {
    setDeposit(JSON.parse(stored));
  }
}, []);


  const d = JSON.parse(localStorage.getItem("deposit")) || { id: "N/A", crop: "N/A", quantity: 0 };

  const handleConfirm = () => {
  
    setPage("Lender"); 
  };

  return (
    <div className="container">
    {deposit && (
  <div style={{ marginBottom: "20px" }}>
    <p><strong>Farmer ID:</strong> {deposit.farmerId}</p>
    <p><strong>Crop:</strong> {deposit.crop}</p>
    <p><strong>Quantity:</strong> {deposit.quantity} units</p>
  </div>
)}

    
      <div className="progress">
       
      </div>

      <h2 className="brand-header">Fasalmitra</h2>
      <h3>Review Deposit Record</h3>

      <div className="feature-card">
        <div className="data-row">
          <span className="label">Deposit ID:</span>
          <span className="value">{d.id}</span>
        </div>
        {/* Crop Value Section */}
<div className="feature-card" style={{ marginTop: "20px" }}>
  <div className="data-row">
    <span className="label">Price per Unit:</span>
    <input
      type="number"
      className="value-input"
      placeholder="Enter price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
  </div>

  <div className="data-row">
    <span className="label">Estimated Crop Value:</span>
    <span className="value">
      ₹{deposit ? (price * deposit.quantity || 0) : 0}
    </span>
  </div>
</div>

        <div className="data-row">
          <span className="label">Crop Type:</span>
          <span className="value">{d.crop}</span>
        </div>
        <div className="data-row">
          <span className="label">Quantity:</span>
          <span className="value">{d.quantity} Units</span>
        </div>
        <div className="data-row">
          <span className="label">Status:</span>
          <span className="value" style={{color: "#10b981"}}>Ready for Approval</span>
        </div>
      </div>

      <div className="button-group">
        <button className="approve-btn" onClick={handleConfirm}>
          Confirm & Send to Lender
        </button>
        <button
    className="approve-btn"
    style={{ backgroundColor: "#0ea5e9" }}
    onClick={() => window.print()}
  >
    Print Crop Deposit Certificate
  </button>
        <button 
          className="reset-btn" 
          style={{ background: "none", color: "#64748b", border: "1px solid #e2e8f0" }}
          onClick={() => setPage("Warehouse")}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
