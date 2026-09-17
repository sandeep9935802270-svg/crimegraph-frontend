import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import Cases from "./pages/Cases"
import CaseDetails from "./pages/CaseDetails"
import Analysis from "./pages/Analysis"
import Reports from "./pages/Reports"
import NetworkView from "./pages/NetworkView"

function App() {
  const [page, setPage] = useState("dashboard")
  const [selectedCase, setSelectedCase] = useState(null)

  return (
    <div>
      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "cases" && (
        <Cases
          setPage={setPage}
          setSelectedCase={setSelectedCase}
        />
      )}

      {page === "case-details" && (
        <CaseDetails
          setPage={setPage}
          selectedCase={selectedCase}
        />
      )}

      {page === "analysis" && (
  <Analysis
    setPage={setPage}
    selectedCase={selectedCase}
    setSelectedCase={setSelectedCase}
  />
)}

      {page === "reports" && (
        <Reports
          setPage={setPage}
          selectedCase={selectedCase}
        />
      )}

      {page === "network" && <NetworkView setPage={setPage} />}
    </div>
  )
}

export default App