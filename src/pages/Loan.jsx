import "../App.css";

export default function Loan({ setPage }) {
  
  const d = JSON.parse(localStorage.getItem("deposit")) || { id: "N/A", quantity: 0 };
  const loanAmount = d.quantity * 2000 * 0.45;

  const handleExit = () => {
    
    localStorage.removeItem("deposit"); 
    
    setPage("Landing"); 
  };

  return (
    <div className="container">
      <div className="progress">
        <div className="step">Warehouse</div>
        <div className="step">Deposit</div>
        <div className="step">Lender</div>
        <div className="step active">Loan</div>
      </div>

      <h2 className="brand-header">Fasalmitra</h2>
      <h2>Loan Successfully Approved</h2>

      <div className="feature-card">
        <p className="badge" style={{ textAlign: "center", fontWeight: "bold", color: "#024f36" }}>
          Transaction Confirmed
        </p>
        
        <div className="data-row">
          <span className="label">Deposit ID:</span>
          <span className="value">{d.id}</span>
        </div>

        <div className="data-row">
          <span className="label">Amount Disbursed:</span>
          <span className="value loan-text">₹{loanAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#010307" }}>
        Farmer now has liquidity and can wait for better market prices.
      </p>

     
      <button 
        className="reset-btn" 
        style={{ background: "#7d44ef", color: "white", marginTop: "20px" }} 
        onClick={handleExit}
      >
        Done & Exit
      </button>
    </div>
  );
}
