import { useEffect, useState } from "react";
import "../App.css";

export default function Lender({ setPage }) {
  const [deposit, setDeposit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("deposit");
    if (stored) {
      setDeposit(JSON.parse(stored));
    }
  }, []);

  const isEligible = deposit && deposit.quantity >= 15;
  const approve = () => {
  if (!isEligible) {
    alert("Loan not approved. Please re-enter warehouse details.");
    localStorage.removeItem("deposit");
    setPage("Warehouse");
    return;
  }

  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setIsSuccess(true);
    setTimeout(() => setPage("Loan"), 3000);
  }, 1500);
};

  return (
    <div className="container dashboard-layout">
      <h1 className="brand-header">Fasalmitra</h1>

      {isSuccess ? (
        <div className="success-container">
          <h2>Loan Approved!</h2>
          <p>Transferring funds to farmer account...</p>
        </div>
      ) : (
        <>
          {deposit && (
            <>
              {/* CDC Verification */}
              <div className="feature-card">
                <div className="data-row">
                  <span className="label">Deposit ID:</span>
                  <span className="value">{deposit.id}</span>
                </div>

                <div className="data-row">
                  <span className="label">Crop:</span>
                  <span className="value">{deposit.crop}</span>
                </div>

                <div className="data-row">
                  <span className="label">Quantity:</span>
                  <span className="value">{deposit.quantity} units</span>
                </div>

                <div className="data-row">
                  <span className="label">Verification Status:</span>
                  <span className="value" style={{ color: "#16a34a" }}>
                    Verified
                  </span>
                </div>
              </div>

              {/* Loan Eligibility */}
              <div className="feature-card" style={{ marginTop: "20px" }}>
                <div className="data-row">
                  <span className="label">Eligible Loan Amount:</span>
                  <span className="value">
                    ₹{(deposit.quantity * 2000 * 0.7).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="data-row">
                  <span className="label">Loan Status:</span>
                  <span className="value" style={{ color: isEligible ? "#0ea5e9" : "#dc2626" }}>
                    
                  {isEligible ? "Eligible" : "Not Eligible"}
                  </span>
                </div>
              </div>

              <button
                className="approve-btn"
                onClick={approve}
                disabled={loading}
                style={{ marginTop: "20px" }}
              >
                {loading ? "Processing..." : "Approve Loan"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
