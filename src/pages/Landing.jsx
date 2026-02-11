export default function Landing({ setPage }) {
  return (
    <div className="Landing">
      <h1>FasalMitra</h1>
      <p>Digital Crop Deposit & Post-Harvest Credit Platform</p>

      <button onClick={() => setPage("warehouse")}>
        Warehouse / FPO Entry
      </button>

      <button onClick={() => setPage("lender")}>
        Lender Dashboard
      </button>
    </div>
  );
}