import { useState } from "react";

export default function Warehouse({ setPage }) {

  const [formData, setFormData] = useState({
    id: "",
    farmerId: "F-9921",
    crop: "Sorghum",
    quantity: ""
  });


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

    // ✅ Proper quantity validation
    const qty = Number(formData.quantity);
    if (!formData.quantity || qty <= 0) {
      alert("Please enter a valid numeric quantity.");
      return;
    }

    localStorage.setItem(
      "deposit",
      JSON.stringify({ ...formData, id: inputID, quantity: qty })
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
