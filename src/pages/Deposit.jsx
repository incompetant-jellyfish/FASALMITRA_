import "../App.css";

export default function Deposit({ setPage }) {
  // Load data saved from Warehouse
  const d = JSON.parse(localStorage.getItem("deposit")) || { id: "N/A", crop: "N/A", quantity: 0 };

  const handleConfirm = () => {
    setPage("lender"); // Move to Lender after verification
  };

  return (
    <div className="container">
      <div className="progress">
        <div className="step">Warehouse</div>
        <div className="step active">Deposit</div>
        <div className="step">Lender</div>
        <div className="step">Loan</div>
      </div>

      <h2 className="brand-header">Fasalmitra</h2>
      <h3>Review Deposit Record</h3>

      <div className="feature-card">
        <div className="data-row">
          <span className="label">Deposit ID:</span>
          <span className="value">{d.id}</span>
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
          className="reset-btn" 
          style={{ background: "none", color: "#64748b", border: "1px solid #e2e8f0" }}
          onClick={() => setPage("warehouse")}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
