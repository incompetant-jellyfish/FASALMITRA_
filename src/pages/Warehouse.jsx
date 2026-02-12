import { useState } from "react";

export default function Warehouse({ setPage }) {

  const [formData, setFormData] = useState({
    id: "",
    farmerId: "F-9921",
    crop: "Sorghum",
    quantity: ""
  });
    const records = [];

const storedDeposit = localStorage.getItem("deposit");
if (storedDeposit) {
  const d = JSON.parse(storedDeposit);
  records.push({
    date: new Date().toLocaleDateString("en-GB"),
    crop: d.crop,
    quantity: d.quantity
  });
}


  const reliabilityScore = records.length > 0 ? 60 : 0;



  
  const cropOptions = [
    { value: "Sorghum", label: "Sorghum (se)" },
    { value: "Wheat", label: "Wheat (Grade A)" },
    { value: "Maize", label: "Maize (Yellow)" },
    { value: "Rice", label: "Rice (Paddy)" },
    { value: "Barley", label: "Barley" },
    { value: "Millet", label: "Millet" },
    { value: "Chickpea", label: "Chickpea (Gram)" },
    { value: "Groundnut", label: "Groundnut" },
    { value: "Soybean", label: "Soybean" }
  ];

  const handleSave = () => {
    const inputID = formData.id.trim().toUpperCase();
    const idPattern = /^25(BCE|BAI|BAS|BCY)\d{4,5}$/;

    if (!idPattern.test(inputID)) {
      alert("Invalid ID! Example: 25BCE1056");
      return;
    }

    
    const qty = Number(formData.quantity);
    if (!formData.quantity || qty <= 0) {
      alert("Please enter a valid numeric quantity.");
      return;
    }

   localStorage.setItem(
  "deposit",
  JSON.stringify({
    ...formData,
    id: inputID,
    quantity: qty,
    storedAt: new Date().toISOString()
  })
);


    setPage("Deposit");
  };

  const handleReset = () => {
    setFormData({
      id: "",
      farmerId: "F-9921",
      crop: "Sorghum",
      quantity: ""
    });
  };
  
  return (
    <div className="container">
      
      <h2 className="brand-header">Fasalmitra</h2>
      <h3>Warehouse Entry</h3>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div><strong>Farmers:</strong> {records.length}</div>
        <div><strong>Total Stored:</strong>{" "}
        {records.reduce((sum, r) => sum + r.quantity, 0)} units
        </div>
        <div><strong>Active Loans:</strong> {records.length}</div>

      </div>


      <div className="input-group">
        <div className="data-row">
          <span className="label">Deposit ID:</span>
          <input
            type="text"
            className="value-input"
            placeholder="e.g. 25BCE1056"
            value={formData.id}
            onChange={(e) =>
              setFormData({ ...formData, id: e.target.value.toUpperCase() })
            }
          />
        </div>

        <div className="data-row">
          <span className="label">Crop Type:</span>
          <select
            className="value-input"
            value={formData.crop}
            onChange={(e) =>
              setFormData({ ...formData, crop: e.target.value })
            }
          >
            {cropOptions.map((crop) => (
              <option key={crop.value} value={crop.value}>
                {crop.label}
              </option>
            ))}
          </select>
        </div>

        <div className="data-row">
          <span className="label">Quantity (Units):</span>
          <input
            type="number"
            min="0"
            step="0"
            className="value-input"
            placeholder="0.00"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>
      </div>

      <hr style={{ border: "0.5px solid #e2e8f0", margin: "20px 0" }} />
            <h4>Storage History</h4>

      {records.length === 0 ? (
  <p style={{ fontSize: "14px", color: "#475569" }}>
    No storage records yet. Add a deposit to begin.
  </p>
) : (
  <table style={{ width: "100%", marginBottom: "20px" }}>
    <thead>
      <tr>
        <th align="left">Date</th>
        <th align="left">Crop</th>
        <th align="left">Quantity</th>
      </tr>
    </thead>
    <tbody>
      {records.map((r, i) => (
        <tr key={i}>
          <td>{r.date}</td>
          <td>{r.crop}</td>
          <td>{r.quantity} units</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

{records.length > 0 && records[0].quantity > 15 && (
  <div      
    style={{
      background: "rgba(220, 38, 38, 0.12)",
      border: "1px solid rgba(220, 38, 38, 0.3)",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "15px"
    }}
  >
    <p style={{ color: "#7f1d1d", margin: 0 }}>
      Alert: Large quantity of crop is currently under storage and should be monitored.
    </p>
  </div>
)}





      <div className="button-group">
        <button className="approve-btn" onClick={handleSave}>
          Generate Record
        </button>

        <button
          className="reset-link"
          onClick={handleReset}
          style={{
            color: "#ef4444",
            cursor: "pointer",
            border: "none",
            background: "none"
          }}
        >
          Clear and Restart
        </button>
      </div>
    </div>
  );
}
