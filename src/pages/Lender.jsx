import { useState } from "react";
import "../App.css"; 

export default function Lender({ setPage }) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // FIXED: Reading "id" instead of "depositId" to match Deposit.jsx
  const d = JSON.parse(localStorage.getItem("deposit")) || { id: "N/A", crop: "None", quantity: 0 };
  
  // Calculation logic
  const loanAmount = d.quantity * 2000 * 0.7;

  const approve = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => setPage("Loan"), 3500); 
    }, 1500);
  };

  return (
    <div className="container dashboard-layout">
      <h1 className="brand-header">Fasalmitra</h1>
      
      {isSuccess ? (
  <div className="success-container"> 
    <div className="checkmark-wrapper">
      <div className="checkmark-circle"></div>
      <div className="checkmark-kick"></div> 
      <div className="checkmark-stem"></div> 
    </div>
    <h2 className="success-text fade-in">Loan Approved!</h2>
    <p className="fade-in">Transferring funds to your account...</p>
  </div>
) : (
 

        <div className="dashboard-content">
          <h2>Lender Dashboard</h2>
          
          <div className="data-row">
            <span className="label">Deposit ID:</span>
            
            <span className="value">{d.id}</span>
          </div>

          <div className="data-row">
            <span className="label">Crop Type:</span>
            <span className="value">{d.crop}</span>
          </div>

          <div className="feature-card">
            <div className="storage-header">
              <span>Warehouse Storage</span>
              <span>{Math.min((d.quantity/100)*100, 100).toFixed(0)}%</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${Math.min((d.quantity/100)*100, 100)}%` }}></div>
            </div>
          </div>

          <div className="data-row">
            <span className="label">Eligible Loan:</span>
            <span className="value loan-text">₹{loanAmount.toLocaleString("en-IN")}</span>
          </div>

          <button type="button" className="approve-btn" onClick={approve} disabled={loading || d.quantity <= 0}>
            {loading ? "Processing..." : "Approve Loan"}
          </button>
        </div>
      )
}</div>
  );
}