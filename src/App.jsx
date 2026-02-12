import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing.jsx";
import Warehouse from "./pages/Warehouse.jsx";
import Deposit from "./pages/Deposit.jsx";
import Lender from "./pages/Lender.jsx";
import Loan from "./pages/Loan.jsx";

function App() {
  
  const [page, setPage] = useState("Landing");
  useEffect(() => {
  localStorage.removeItem("deposit");
}, []);

  return (
    <>
      {page === "Landing" && <Landing setPage={setPage} />}
      {page === "Warehouse" && <Warehouse setPage={setPage} />}
      {page === "Deposit" && <Deposit setPage={setPage} />}
      {page === "Lender" && <Lender setPage={setPage} />}
      {page === "Loan" && <Loan setPage={setPage} />}
    </>
  );
}

export default App;
