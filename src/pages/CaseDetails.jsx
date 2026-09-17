import { useState } from "react"
import Navbar from "../components/Navbar"

function CaseDetails({ setPage, selectedCase }) {
  const [showEvidenceForm, setShowEvidenceForm] = useState(false)
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  const [evidenceForm, setEvidenceForm] = useState({
    type: "Financial Record",
    source: "",
    person: "",
    severity: "Medium",
    description: "",
  })

  const defaultEvidence = [
    {
      id: "EV-001",
      type: "Financial Record",
      source: "Bank Transaction Dataset",
      person: "Person A",
      severity: "High",
      confidence: 96,
      date: "12 Sep 2026",
      description:
        "Suspicious financial transaction pattern detected across linked accounts.",
    },
    {
      id: "EV-002",
      type: "Communication",
      source: "Call Metadata",
      person: "Person B",
      severity: "Medium",
      confidence: 89,
      date: "11 Sep 2026",
      description:
        "Repeated communication relationship identified between network entities.",
    },
    {
      id: "EV-003",
      type: "Location Data",
      source: "Location Intelligence",
      person: "Person D",
      severity: "Medium",
      confidence: 82,
      date: "09 Sep 2026",
      description:
        "Repeated location overlap detected between associated entities.",
    },
  ]

  /* ================================
     CASE-WISE EVIDENCE STORAGE
  ================================= */

  const [evidence, setEvidence] = useState(() => {
    if (!selectedCase?.id) {
      return defaultEvidence
    }

    const storageKey = `criminal_network_evidence_${selectedCase.id}`

    const savedEvidence = localStorage.getItem(storageKey)

    if (savedEvidence) {
      try {
        return JSON.parse(savedEvidence)
      } catch {
        return defaultEvidence
      }
    }

    return defaultEvidence
  })

  /* ================================
     NO CASE SELECTED
  ================================= */

  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-[#060b14] text-white">
        <Navbar setPage={setPage} />

        <main className="max-w-[1500px] mx-auto px-6 py-8">
          <button
            onClick={() => setPage("cases")}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Case Registry
          </button>

          <div className="mt-8 border border-slate-800 bg-[#0b1220] rounded-xl p-12 text-center">
            <div className="text-slate-500 text-3xl mb-3">—</div>

            <h2 className="text-lg font-semibold text-white">
              No case selected
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Select a case from the registry to view investigation details.
            </p>
          </div>
        </main>
      </div>
    )
  }

  /* ================================
     ADD EVIDENCE
  ================================= */

  const handleAddEvidence = (e) => {
    e.preventDefault()

    if (!evidenceForm.source || !evidenceForm.person) {
      alert("Please fill Source and Related Person.")
      return
    }

    const existingNumbers = evidence.map((item) => {
      const number = Number(item.id.replace("EV-", ""))
      return Number.isNaN(number) ? 0 : number
    })

    const nextNumber =
      existingNumbers.length > 0
        ? Math.max(...existingNumbers) + 1
        : 1

    const newEvidence = {
      id: `EV-${String(nextNumber).padStart(3, "0")}`,
      type: evidenceForm.type,
      source: evidenceForm.source,
      person: evidenceForm.person,
      severity: evidenceForm.severity,
      confidence: Math.floor(Math.random() * 12) + 84,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      description: evidenceForm.description,
    }

    const updatedEvidence = [newEvidence, ...evidence]

    setEvidence(updatedEvidence)

    const storageKey = `criminal_network_evidence_${selectedCase.id}`

    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedEvidence)
    )

    setEvidenceForm({
      type: "Financial Record",
      source: "",
      person: "",
      severity: "Medium",
      description: "",
    })

    setShowEvidenceForm(false)
  }

  /* ================================
     EXPORT EVIDENCE
  ================================= */

  const handleExportEvidence = () => {
    const data = JSON.stringify(evidence, null, 2)

    const blob = new Blob([data], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")

    link.href = url
    link.download = `${selectedCase.id}-evidence.json`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  /* ================================
     STATISTICS
  ================================= */

  const highSeverityCount = evidence.filter(
    (item) => item.severity === "High"
  ).length

  const averageConfidence =
    evidence.length > 0
      ? Math.round(
          evidence.reduce(
            (sum, item) => sum + Number(item.confidence || 0),
            0
          ) / evidence.length
        )
      : 0

  const riskScore =
    selectedCase.risk === "High"
      ? 87
      : selectedCase.risk === "Medium"
      ? 64
      : 31

  /* ================================
     SEVERITY STYLE
  ================================= */

  const getSeverityStyle = (severity) => {
    if (severity === "High") {
      return "text-red-400 bg-red-500/10 border-red-500/20"
    }

    if (severity === "Medium") {
      return "text-amber-400 bg-amber-500/10 border-amber-500/20"
    }

    return "text-slate-400 bg-slate-500/10 border-slate-600"
  }

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-200">
      <Navbar setPage={setPage} />

      <main className="max-w-[1500px] mx-auto px-6 py-7">

        {/* =================================
            BREADCRUMB / BACK
        ================================= */}

        <div className="flex items-center justify-between mb-6">

          <button
            onClick={() => setPage("cases")}
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Case Registry
          </button>

          <div className="text-xs text-slate-600">
            Investigation / {selectedCase.id}
          </div>

        </div>

        {/* =================================
            CASE HEADER
        ================================= */}

        <section className="border border-slate-800 bg-[#0b1220] rounded-xl">

          <div className="px-6 py-5 border-b border-slate-800">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3 mb-2">

                  <span className="text-[11px] uppercase tracking-[0.16em] text-blue-400">
                    Investigation Case
                  </span>

                  <span className="text-[11px] text-slate-600">
                    •
                  </span>

                  <span className="text-[11px] font-mono text-slate-500">
                    {selectedCase.id}
                  </span>

                </div>

                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                  {selectedCase.title}
                </h1>

                <p className="text-sm text-slate-500 mt-2">
                  Investigation record and network intelligence overview
                </p>

              </div>

              <div className="flex items-center gap-2">

                <span
                  className={`px-3 py-1.5 rounded-md border text-xs font-medium ${
                    selectedCase.risk === "High"
                      ? "text-red-400 bg-red-500/10 border-red-500/20"
                      : selectedCase.risk === "Medium"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                      : "text-slate-300 bg-slate-500/10 border-slate-700"
                  }`}
                >
                  {selectedCase.risk} Risk
                </span>

                <span className="px-3 py-1.5 rounded-md border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-medium">
                  {selectedCase.status}
                </span>

              </div>

            </div>

          </div>

          {/* CASE META */}

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-800">

            <div className="px-6 py-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Subjects
              </p>

              <p className="text-lg font-semibold text-white mt-1">
                {selectedCase.suspects}
              </p>
            </div>

            <div className="px-6 py-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Jurisdiction
              </p>

              <p className="text-sm font-medium text-slate-300 mt-2">
                {selectedCase.location}
              </p>
            </div>

            <div className="px-6 py-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Case Risk
              </p>

              <p
                className={`text-sm font-semibold mt-2 ${
                  selectedCase.risk === "High"
                    ? "text-red-400"
                    : selectedCase.risk === "Medium"
                    ? "text-amber-400"
                    : "text-slate-300"
                }`}
              >
                {selectedCase.risk}
              </p>
            </div>

            <div className="px-6 py-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Last Activity
              </p>

              <p className="text-sm font-medium text-slate-300 mt-2">
                {selectedCase.updated}
              </p>
            </div>

          </div>

        </section>

        {/* =================================
            INTELLIGENCE OVERVIEW
        ================================= */}

        <section className="mt-6">

          <div className="flex items-end justify-between mb-3">

            <div>
             <h2 className="text-base font-semibold text-red-400">
                Intelligence Overview
            </h2>
              <p className="text-xs text-slate-500 mt-1">
                Current network assessment based on available case data
              </p>
            </div>

            <span className="hidden sm:block text-[11px] text-slate-600">
              Analysis status: Current
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            {/* RISK */}

            <div className="border border-slate-800 bg-[#0b1220] rounded-lg p-5">

              <div className="flex items-center justify-between">

                <p className="text-xs text-slate-500">
                  Network Risk
                </p>

                <span className="text-[10px] uppercase tracking-wider text-red-400">
                  Elevated
                </span>

              </div>

              <div className="flex items-end gap-2 mt-4">

                <span className="text-3xl font-semibold text-white">
                  {riskScore}
                </span>

                <span className="text-sm text-slate-600 mb-1">
                  / 100
                </span>

              </div>

              <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${riskScore}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 mt-2">
                Composite network risk assessment
              </p>

            </div>

            {/* ENTITIES */}

            <div className="border border-slate-800 bg-[#0b1220] rounded-lg p-5">

              <div className="flex items-center justify-between">

                <p className="text-xs text-slate-500">
                  Network Entities
                </p>

                <span className="text-[10px] uppercase tracking-wider text-blue-400">
                  Identified
                </span>

              </div>

              <p className="text-3xl font-semibold text-white mt-4">
                18
              </p>

              <p className="text-[11px] text-slate-500 mt-3">
                Persons, accounts and linked entities
              </p>

            </div>

            {/* CONNECTIONS */}

            <div className="border border-slate-800 bg-[#0b1220] rounded-lg p-5">

              <div className="flex items-center justify-between">

                <p className="text-xs text-slate-500">
                  Flagged Relationships
                </p>

                <span className="text-[10px] uppercase tracking-wider text-amber-400">
                  Review
                </span>

              </div>

              <p className="text-3xl font-semibold text-white mt-4">
                6
              </p>

              <p className="text-[11px] text-slate-500 mt-3">
                Connections requiring investigator review
              </p>

            </div>

          </div>

        </section>

        {/* =================================
            EVIDENCE
        ================================= */}

        <section className="mt-7">

          <div className="border border-slate-800 bg-[#0b1220] rounded-xl overflow-hidden">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-slate-800">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="text-base font-semibold text-white">
                      Evidence Register
                    </h2>

                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                      {evidence.length} records
                    </span>

                  </div>

                  <p className="text-xs text-slate-500 mt-1">
                    Evidence currently associated with {selectedCase.id}
                  </p>

                </div>

                <button
                  onClick={() => setShowEvidenceForm(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2.5 rounded-md transition"
                >
                  + Add Evidence
                </button>

              </div>

            </div>

            {/* EVIDENCE SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-slate-800">

              <div className="px-6 py-4 border-b sm:border-b-0 sm:border-r border-slate-800">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Total Records
                </p>

                <p className="text-xl font-semibold text-white mt-1">
                  {evidence.length}
                </p>

              </div>

              <div className="px-6 py-4 border-b sm:border-b-0 sm:border-r border-slate-800">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  High Severity
                </p>

                <p className="text-xl font-semibold text-red-400 mt-1">
                  {highSeverityCount}
                </p>

              </div>

              <div className="px-6 py-4">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Avg. Confidence
                </p>

                <p className="text-xl font-semibold text-emerald-400 mt-1">
                  {averageConfidence}%
                </p>

              </div>

            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead>
                  <tr className="border-b border-slate-800 bg-[#09101c]">

                    <th className="text-left px-6 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Reference
                    </th>

                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Evidence Type
                    </th>

                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Source
                    </th>

                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Subject
                    </th>

                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Severity
                    </th>

                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Confidence
                    </th>

                    <th className="text-right px-6 py-3 text-[10px] uppercase tracking-wider font-medium text-slate-600">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {evidence.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b border-slate-800/80 hover:bg-slate-800/20 transition"
                    >

                      <td className="px-6 py-4">

                        <span className="font-mono text-xs text-blue-400">
                          {item.id}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <div className="text-xs font-medium text-slate-200">
                          {item.type}
                        </div>

                      </td>

                      <td className="px-4 py-4">

                        <div className="text-xs text-slate-400">
                          {item.source}
                        </div>

                      </td>

                      <td className="px-4 py-4">

                        <span className="text-xs text-slate-300">
                          {item.person}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`inline-flex items-center px-2 py-1 rounded border text-[10px] font-medium ${getSeverityStyle(
                            item.severity
                          )}`}
                        >
                          {item.severity}
                        </span>

                      </td>

                      <td className="px-4 py-4">

                        <div className="flex items-center gap-2">

                          <span className="text-xs text-emerald-400">
                            {item.confidence}%
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-right">

                        <button
                          onClick={() =>
                            setSelectedEvidence(item)
                          }
                          className="text-xs text-blue-400 hover:text-blue-300 transition"
                        >
                          Inspect →
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {evidence.length === 0 && (

              <div className="py-14 text-center">

                <p className="text-sm text-slate-400">
                  No evidence records available.
                </p>

                <p className="text-xs text-slate-600 mt-1">
                  Add an evidence record to begin building the case register.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* =================================
            ACTION BAR
        ================================= */}

        <section className="mt-6 mb-10">

          <div className="border border-slate-800 bg-[#0b1220] rounded-xl px-6 py-5">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

              <div>

                <h2 className="text-sm font-semibold text-white">
                  Investigation Tools
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Continue analysis or generate an investigation record.
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => setPage("analysis")}
                  className="px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
                >
                  Run Analysis
                </button>

                <button
                  onClick={() => setPage("reports")}
                  className="px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
                >
                  Generate Report
                </button>

                <button
                  onClick={handleExportEvidence}
                  className="px-4 py-2.5 rounded-md border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium transition"
                >
                  Export Evidence
                </button>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =================================
          ADD EVIDENCE MODAL
      ================================= */}

      {showEvidenceForm && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-xl bg-[#0b1220] border border-slate-700 rounded-xl shadow-2xl">

            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">

              <div>

                <h2 className="text-base font-semibold text-white">
                  Add Evidence Record
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Register evidence against {selectedCase.id}
                </p>

              </div>

              <button
                onClick={() => setShowEvidenceForm(false)}
                className="text-slate-500 hover:text-white text-xl transition"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleAddEvidence}
              className="p-6 space-y-4"
            >

              {/* TYPE */}

              <div>

                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Evidence Type
                </label>

                <select
                  value={evidenceForm.type}
                  onChange={(e) =>
                    setEvidenceForm({
                      ...evidenceForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full bg-[#070d17] border border-slate-700 text-slate-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>Financial Record</option>
                  <option>Communication</option>
                  <option>Location Data</option>
                  <option>Digital Evidence</option>
                  <option>Document</option>
                  <option>Other</option>
                </select>

              </div>

              {/* SOURCE */}

              <div>

                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Source
                </label>

                <input
                  type="text"
                  value={evidenceForm.source}
                  onChange={(e) =>
                    setEvidenceForm({
                      ...evidenceForm,
                      source: e.target.value,
                    })
                  }
                  placeholder="e.g. Bank transaction dataset"
                  className="w-full bg-[#070d17] border border-slate-700 text-slate-200 placeholder-slate-700 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>

              {/* PERSON */}

              <div>

                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Related Subject
                </label>

                <input
                  type="text"
                  value={evidenceForm.person}
                  onChange={(e) =>
                    setEvidenceForm({
                      ...evidenceForm,
                      person: e.target.value,
                    })
                  }
                  placeholder="e.g. Person A"
                  className="w-full bg-[#070d17] border border-slate-700 text-slate-200 placeholder-slate-700 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>

              {/* SEVERITY */}

              <div>

                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Severity
                </label>

                <select
                  value={evidenceForm.severity}
                  onChange={(e) =>
                    setEvidenceForm({
                      ...evidenceForm,
                      severity: e.target.value,
                    })
                  }
                  className="w-full bg-[#070d17] border border-slate-700 text-slate-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  Observation
                </label>

                <textarea
                  rows="4"
                  value={evidenceForm.description}
                  onChange={(e) =>
                    setEvidenceForm({
                      ...evidenceForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter a short description of the evidence..."
                  className="w-full bg-[#070d17] border border-slate-700 text-slate-200 placeholder-slate-700 rounded-md px-3 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-2 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowEvidenceForm(false)
                  }
                  className="px-4 py-2.5 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
                >
                  Add Record
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =================================
          EVIDENCE DETAILS MODAL
      ================================= */}

      {selectedEvidence && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-[#0b1220] border border-slate-700 rounded-xl shadow-2xl">

            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">

              <div>

                <p className="text-[10px] uppercase tracking-[0.15em] text-blue-400">
                  Evidence Record
                </p>

                <h2 className="text-lg font-semibold text-white mt-1 font-mono">
                  {selectedEvidence.id}
                </h2>

              </div>

              <button
                onClick={() => setSelectedEvidence(null)}
                className="text-slate-500 hover:text-white text-xl"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div className="grid grid-cols-2 gap-3">

                <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Type
                  </p>

                  <p className="text-sm text-slate-200 mt-2">
                    {selectedEvidence.type}
                  </p>

                </div>

                <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Severity
                  </p>

                  <p className="text-sm text-slate-200 mt-2">
                    {selectedEvidence.severity}
                  </p>

                </div>

              </div>

              <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Source
                </p>

                <p className="text-sm text-slate-200 mt-2">
                  {selectedEvidence.source}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Related Subject
                  </p>

                  <p className="text-sm text-slate-200 mt-2">
                    {selectedEvidence.person}
                  </p>

                </div>

                <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Confidence
                  </p>

                  <p className="text-sm text-emerald-400 mt-2">
                    {selectedEvidence.confidence}%
                  </p>

                </div>

              </div>

              <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Recorded
                </p>

                <p className="text-sm text-slate-300 mt-2">
                  {selectedEvidence.date}
                </p>

              </div>

              <div className="bg-[#070d17] border border-slate-800 rounded-md p-4">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Observation
                </p>

                <p className="text-sm leading-6 text-slate-400 mt-2">
                  {selectedEvidence.description ||
                    "No observation was provided for this record."}
                </p>

              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-800">

              <button
                onClick={() => setSelectedEvidence(null)}
                className="w-full px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                Close Record
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CaseDetails