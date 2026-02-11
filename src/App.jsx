import { useState } from "react";
import Landing from "./pages/Landing";
import Warehouse from "./pages/Warehouse";
import Deposit from "./pages/Deposit";
import Lender from "./pages/Lender";
import Loan from "./pages/Loan";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page === "landing" && <Landing setPage={setPage} />}
      {page === "warehouse" && <Warehouse setPage={setPage} />}
      {page === "deposit" && <Deposit setPage={setPage} />}
      {page === "lender" && <Lender setPage={setPage} />}
      {page === "loan" && <Loan />}
    </>
  );
}

export default App;
