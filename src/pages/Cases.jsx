import { useState } from "react"
import Navbar from "../components/Navbar"

function Cases({ setPage, setSelectedCase }) {
  const defaultCases = [
    {
      id: "CASE-1024",
      title: "Organized Crime Network",
      suspects: 18,
      risk: "High",
      status: "Active",
      location: "Kanpur",
      updated: "10 min ago",
    },
    {
      id: "CASE-1025",
      title: "Financial Fraud Network",
      suspects: 9,
      risk: "Medium",
      status: "Active",
      location: "Lucknow",
      updated: "35 min ago",
    },
    {
      id: "CASE-1026",
      title: "Drug Trafficking Network",
      suspects: 24,
      risk: "High",
      status: "Under Analysis",
      location: "Delhi",
      updated: "1 hr ago",
    },
    {
      id: "CASE-1027",
      title: "Cyber Crime Investigation",
      suspects: 7,
      risk: "Low",
      status: "Closed",
      location: "Noida",
      updated: "2 hrs ago",
    },
  ]

  const [cases, setCases] = useState(() => {
    const savedCases = localStorage.getItem("criminal_network_cases")

    if (savedCases) {
      try {
        return JSON.parse(savedCases)
      } catch {
        return defaultCases
      }
    }

    return defaultCases
  })

  const [search, setSearch] = useState("")
  const [riskFilter, setRiskFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [newCase, setNewCase] = useState({
    title: "",
    suspects: "",
    risk: "Medium",
    status: "Active",
    location: "",
  })

  // SEARCH + FILTER
  const filteredCases = cases.filter((item) => {
    const query = search.toLowerCase()

    const matchesSearch =
      item.id.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)

    const matchesRisk =
      riskFilter === "All" || item.risk === riskFilter

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter

    return matchesSearch && matchesRisk && matchesStatus
  })

  // SUMMARY COUNTS
  const highRisk = cases.filter((item) => item.risk === "High").length

  const activeCases = cases.filter(
    (item) => item.status === "Active"
  ).length

  const underAnalysis = cases.filter(
    (item) => item.status === "Under Analysis"
  ).length

  // CREATE CASE
  const handleCreateCase = (e) => {
    e.preventDefault()

    if (!newCase.title || !newCase.suspects || !newCase.location) {
      alert("Please fill all required fields.")
      return
    }

    const existingNumbers = cases.map((item) =>
      Number(item.id.replace("CASE-", ""))
    )

    const nextNumber =
      existingNumbers.length > 0
        ? Math.max(...existingNumbers) + 1
        : 1001

    const createdCase = {
      id: `CASE-${nextNumber}`,
      title: newCase.title,
      suspects: Number(newCase.suspects),
      risk: newCase.risk,
      status: newCase.status,
      location: newCase.location,
      updated: "Just now",
    }

    const updatedCases = [createdCase, ...cases]

    setCases(updatedCases)

    localStorage.setItem(
      "criminal_network_cases",
      JSON.stringify(updatedCases)
    )

    setNewCase({
      title: "",
      suspects: "",
      risk: "Medium",
      status: "Active",
      location: "",
    })

    setShowCreateForm(false)
  }

  // DELETE CASE
  const handleDeleteCase = (caseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this case?"
    )

    if (!confirmed) return

    const updatedCases = cases.filter(
      (item) => item.id !== caseId
    )

    setCases(updatedCases)

    localStorage.setItem(
      "criminal_network_cases",
      JSON.stringify(updatedCases)
    )

    // Clear selected case if deleted
    if (setSelectedCase) {
      setSelectedCase((current) => {
        if (current?.id === caseId) {
          return null
        }

        return current
      })
    }
  }

  // RISK STYLE
  const getRiskStyle = (risk) => {
    if (risk === "High") {
      return "bg-red-500/10 text-red-400 border-red-500/20"
    }

    if (risk === "Medium") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }

    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  }

  // STATUS STYLE
  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }

    if (status === "Under Analysis") {
      return "bg-violet-500/10 text-violet-400 border-violet-500/20"
    }

    return "bg-slate-500/10 text-slate-400 border-slate-600"
  }

  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <Navbar setPage={setPage} />

      <main className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-8 py-7">

        {/* HEADER */}
        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

              <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
                Investigation Management
              </p>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Investigation Cases
            </h1>

            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Monitor active investigations, review case intelligence and
              access network analysis.
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg shadow-blue-950/20"
          >
            <span className="text-lg leading-none">+</span>
            Create New Case
          </button>

        </section>

        {/* SUMMARY */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  Total Cases
                </p>

                <p className="text-2xl font-semibold text-white mt-2">
                  {cases.length}
                </p>
              </div>

              <div className="h-9 w-9 rounded-lg bg-slate-800/70 flex items-center justify-center text-slate-400">
                ◫
              </div>

            </div>

            <p className="text-xs text-slate-600 mt-3">
              Registered investigations
            </p>
          </div>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  Active Cases
                </p>

                <p className="text-2xl font-semibold text-blue-400 mt-2">
                  {activeCases}
                </p>
              </div>

              <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                ●
              </div>

            </div>

            <p className="text-xs text-slate-600 mt-3">
              Currently under investigation
            </p>
          </div>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                  High Risk
                </p>

                <p className="text-2xl font-semibold text-red-400 mt-2">
                  {highRisk}
                </p>
              </div>

              <div className="h-9 w-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
                !
              </div>

            </div>

            <p className="text-xs text-slate-600 mt-3">
              Requires priority attention
            </p>
          </div>

        </section>

        {/* FILTER TOOLBAR */}
        <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-4 mb-5">

          <div className="flex flex-col xl:flex-row gap-3">

            {/* SEARCH */}
            <div className="flex-1 relative">

              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search by case ID, investigation or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#070d17] border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition"
              />

            </div>

            {/* RISK */}
            <div className="w-full xl:w-44">

              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/60"
              >
                <option value="All">All Risk Levels</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>

            </div>

            {/* STATUS */}
            <div className="w-full xl:w-48">

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/60"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Under Analysis">
                  Under Analysis
                </option>
                <option value="Closed">Closed</option>
              </select>

            </div>

          </div>

        </section>

        {/* CASE REGISTRY */}
        <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl overflow-hidden">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 border-b border-slate-800/80">

            <div>
              <h2 className="text-sm font-semibold text-white">
                Case Registry
              </h2>

              <p className="text-xs text-slate-600 mt-1">
                {filteredCases.length} of {cases.length} investigations
              </p>
            </div>

            {underAnalysis > 0 && (
              <div className="text-xs text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-md">
                {underAnalysis} under analysis
              </div>
            )}

          </div>

          {filteredCases.length > 0 ? (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[980px]">

                <thead>
                  <tr className="bg-[#080e19] border-b border-slate-800/80">

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Case
                    </th>

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Investigation
                    </th>

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Location
                    </th>

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Suspects
                    </th>

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Risk
                    </th>

                    <th className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-right px-5 py-3 text-[10px] uppercase tracking-wider font-semibold text-slate-600">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredCases.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/20 transition"
                    >

                      {/* CASE */}
                      <td className="px-5 py-4">

                        <p className="text-sm font-semibold text-blue-400">
                          {item.id}
                        </p>

                        <p className="text-[11px] text-slate-600 mt-1">
                          Updated {item.updated}
                        </p>

                      </td>

                      {/* INVESTIGATION */}
                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-slate-200">
                          {item.title}
                        </p>

                      </td>

                      {/* LOCATION */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="text-slate-600">⌖</span>
                          {item.location}
                        </div>

                      </td>

                      {/* SUSPECTS */}
                      <td className="px-5 py-4">

                        <span className="text-sm font-medium text-slate-300">
                          {item.suspects}
                        </span>

                      </td>

                      {/* RISK */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-md text-[11px] font-medium ${getRiskStyle(
                            item.risk
                          )}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {item.risk}
                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex border px-2.5 py-1 rounded-md text-[11px] font-medium ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-2">

                          {/* VIEW */}
                          <button
                            onClick={() => {
                              setSelectedCase(item)
                              setPage("case-details")
                            }}
                            className="text-xs font-medium text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 bg-slate-900/50 hover:bg-slate-800 px-3 py-2 rounded-md transition"
                          >
                            View Case →
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteCase(item.id)}
                            title="Delete Case"
                            className="h-9 w-9 flex items-center justify-center rounded-md border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:border-red-500/40 transition"
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          ) : (
            <div className="py-16 text-center">

              <div className="h-12 w-12 mx-auto rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-500 text-xl">
                ⌕
              </div>

              <h3 className="text-sm font-medium text-slate-300 mt-4">
                No investigations found
              </h3>

              <p className="text-xs text-slate-600 mt-1">
                Try changing your search or filter criteria.
              </p>

            </div>
          )}

        </section>

      </main>

      {/* CREATE CASE MODAL */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateForm(false)
            }
          }}
        >

          <div className="w-full max-w-xl bg-[#0b1220] border border-slate-700/80 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">

            {/* MODAL HEADER */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800">

              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-blue-400 font-semibold">
                  New Investigation
                </p>

                <h2 className="text-lg font-semibold text-white mt-1">
                  Create New Case
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Add an investigation to the case registry.
                </p>
              </div>

              <button
                onClick={() => setShowCreateForm(false)}
                className="h-8 w-8 rounded-md text-slate-500 hover:text-white hover:bg-slate-800 transition"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleCreateCase}
              className="p-6 space-y-5"
            >

              {/* TITLE */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Investigation Name{" "}
                  <span className="text-red-400">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Organized Crime Network"
                  value={newCase.title}
                  onChange={(e) =>
                    setNewCase({
                      ...newCase,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Primary Location{" "}
                  <span className="text-red-400">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Kanpur"
                  value={newCase.location}
                  onChange={(e) =>
                    setNewCase({
                      ...newCase,
                      location: e.target.value,
                    })
                  }
                  className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60"
                />
              </div>

              {/* SUSPECTS */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Number of Suspects{" "}
                  <span className="text-red-400">*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  value={newCase.suspects}
                  onChange={(e) =>
                    setNewCase({
                      ...newCase,
                      suspects: e.target.value,
                    })
                  }
                  className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60"
                />
              </div>

              {/* RISK + STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Risk Level
                  </label>

                  <select
                    value={newCase.risk}
                    onChange={(e) =>
                      setNewCase({
                        ...newCase,
                        risk: e.target.value,
                      })
                    }
                    className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/60"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2">
                    Case Status
                  </label>

                  <select
                    value={newCase.status}
                    onChange={(e) =>
                      setNewCase({
                        ...newCase,
                        status: e.target.value,
                      })
                    }
                    className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-bluenpm-500/60"
                  >
                    <option value="Active">Active</option>

                    <option value="Under Analysis">
                      Under Analysis
                    </option>

                    <option value="Closed">
                      Closed
                    </option>
                  </select>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 bg-slate-900 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition"
                >
                  Create Case
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default Cases