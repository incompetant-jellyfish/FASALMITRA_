import { useState } from "react";

export default function Warehouse({ setPage }) {
  // 1. Unified State (Matches Deposit logic)
  const [formData, setFormData] = useState({
    id: "",
    farmerId: "F-9921", // Static for prototype
    crop: "Sorghum",
    quantity: ""
  });

  // 2. Validation and Save Logic
  const handleSave = () => {
    const inputID = formData.id.toUpperCase();
    
    // Rigid ID Pattern: 25 + (BCE/BAI/BAS/BCY) + 4-5 digits
    const idPattern = /^25(BCE|BAI|BAS|BCY)\d{4,5}$/;

    if (!idPattern.test(inputID)) {
      alert("Invalid ID! Example: 25BCE1056");
      return;
    }

    const qty = parseFloat(formData.quantity);
    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid numeric quantity.");
      return;
    }

    // Save to localStorage and move to the 'deposit' verification page
    localStorage.setItem("deposit", JSON.stringify({ ...formData, id: inputID, quantity: qty }));
    setPage("deposit");
  };

  const handleReset = () => {
    setFormData({ id: "", farmerId: "F-9921", crop: "Sorghum", quantity: "" });
  };

  return (
    <div className="container">
      <div className="progress">
        <div className="step active">Warehouse</div>
        <div className="step">Deposit</div>
        <div className="step">Lender</div>
        <div className="step">Loan</div>
      </div>

      <h2 className="brand-header">Fasalmitra</h2>
      <h3>Warehouse Entry</h3>

      <div className="input-group">
        <div className="data-row">
          <span className="label">Deposit ID:</span>
          <input 
            type="text" 
            className="value-input"
            placeholder="e.g. 25BCE1056" 
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value.toUpperCase()})} 
          />
        </div>

        <div className="data-row">
          <span className="label">Crop Type:</span>
          <select 
            className="value-input"
            value={formData.crop} 
            onChange={(e) => setFormData({...formData, crop: e.target.value})}
          >
            <option value="Sorghum">Sorghum (se)</option>
            <option value="Wheat">Wheat (Grade A)</option>
            <option value="Maize">Maize (Yellow)</option>
          </select>
        </div>

        <div className="data-row">
          <span className="label">Quantity (Units):</span>
          <input 
            type="number" 
            className="value-input"
            placeholder="0.00" 
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})} 
          />
        </div>
      </div>

      <hr style={{ border: "0.5px solid #e2e8f0", margin: "20px 0" }} />

      <div className="button-group">
        <button className="approve-btn" onClick={handleSave}>
          Generate Record
        </button>
        
        <button className="reset-link" onClick={handleReset} style={{ color: "#ef4444", cursor: "pointer", border: "none", background: "none" }}>
          Clear and Restart
        </button>
      </div>
    </div>
  );
}