import { useState } from "react"
import Navbar from "../components/Navbar"

function Analysis({ setPage, setSelectedCase }) {
  const [caseId, setCaseId] = useState("CASE-1024")
  const [analysisType, setAnalysisType] = useState("Network Analysis")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const runAnalysis = () => {
    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      setResult({
        riskScore: 87,
        riskLevel: "HIGH",
        confidence: 94,
        nodes: 18,
        connections: 47,
        suspiciousConnections: 6,
        findings: [
          {
            title: "Strong Network Leader",
            description:
              "Person A has the highest connectivity score and appears to be a central node in the detected network.",
            severity: "High",
          },
          {
            title: "Suspicious Financial Relationship",
            description:
              "Multiple financial links were detected between high-risk entities within the selected case.",
            severity: "High",
          },
          {
            title: "Hidden Association Detected",
            description:
              "AI identified a previously unknown relationship between Person B and Person D.",
            severity: "Medium",
          },
        ],
      })

      setIsAnalyzing(false)
    }, 1800)
  }

  const getSeverityStyle = (severity) => {
    if (severity === "High") {
      return {
        dot: "bg-red-400",
        badge: "bg-red-500/10 text-red-400 border-red-500/20",
      }
    }

    return {
      dot: "bg-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    }
  }

  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <Navbar setPage={setPage} />

      <main className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-8 py-7">

        {/* HEADER */}
        <section className="mb-7">
          <button
            onClick={() => setPage("analysis")}
            className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-blue-400 transition mb-4"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
                  Intelligence Analysis
                </p>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                AI Network Analysis
              </h1>

              <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                Analyze criminal networks, identify suspicious relationships
                and surface hidden associations from investigation data.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Analysis engine available
            </div>
          </div>
        </section>

        {/* CONFIGURATION */}
        <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl overflow-hidden mb-5">

          <div className="px-5 py-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Analysis Configuration
              </h2>

              <p className="text-xs text-slate-600 mt-1">
                Select the investigation and intelligence operation.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Engine Ready
            </span>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* CASE */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
                Investigation Case
              </label>

              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/60 transition"
              >
                <option value="CASE-1024">CASE-1024</option>
                <option value="CASE-1025">CASE-1025</option>
                <option value="CASE-1026">CASE-1026</option>
                <option value="CASE-1027">CASE-1027</option>
              </select>
            </div>

            {/* ANALYSIS TYPE */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-2">
                Analysis Type
              </label>

              <select
                value={analysisType}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="w-full bg-[#070d17] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-blue-500/60 transition"
              >
                <option value="Network Analysis">
                  Network Analysis
                </option>
                <option value="Risk Prediction">
                  Risk Prediction
                </option>
                <option value="Relationship Detection">
                  Relationship Detection
                </option>
                <option value="Pattern Detection">
                  Pattern Detection
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  isAnalyzing
                    ? "bg-blue-900/60 text-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/20"
                }`}
              >
                {isAnalyzing ? "Analyzing Investigation..." : "Run AI Analysis"}
              </button>
            </div>

          </div>
        </section>

        {/* PROCESSING */}
        {isAnalyzing && (
          <section className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mb-5">

            <div className="flex items-center gap-4">

              <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-400">
                  Analysis in progress
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Processing entities, relationships, risk indicators and
                  network patterns...
                </p>
              </div>

            </div>

          </section>
        )}

        {/* RESULTS */}
        {result && !isAnalyzing && (
          <div>

            {/* RESULT HEADER */}
            <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl px-5 py-4 mb-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">
                      Analysis Completed
                    </p>
                  </div>

                  <h2 className="text-base font-semibold text-white">
                    {caseId}
                    <span className="text-slate-600 mx-2">/</span>
                    {analysisType}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">
                    AI Confidence
                  </span>

                  <span className="font-semibold text-emerald-400">
                    {result.confidence}%
                  </span>
                </div>

              </div>

            </section>

            {/* METRICS */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

              <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Risk Score
                </p>

                <p className="text-2xl font-semibold text-red-400 mt-2">
                  {result.riskScore}%
                </p>

                <p className="text-xs text-slate-600 mt-2">
                  Network risk assessment
                </p>
              </div>

              <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Entities
                </p>

                <p className="text-2xl font-semibold text-white mt-2">
                  {result.nodes}
                </p>

                <p className="text-xs text-slate-600 mt-2">
                  Detected network entities
                </p>
              </div>

              <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Connections
                </p>

                <p className="text-2xl font-semibold text-blue-400 mt-2">
                  {result.connections}
                </p>

                <p className="text-xs text-slate-600 mt-2">
                  Detected relationships
                </p>
              </div>

              <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Suspicious Links
                </p>

                <p className="text-2xl font-semibold text-amber-400 mt-2">
                  {result.suspiciousConnections}
                </p>

                <p className="text-xs text-slate-600 mt-2">
                  Require investigation
                </p>
              </div>

            </section>

            {/* MAIN ANALYSIS */}
            <section className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

              {/* RISK PANEL */}
              <div className="lg:col-span-2 bg-[#0b1220] border border-slate-800/80 rounded-xl p-6">

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                    Network Intelligence
                  </p>

                  <h2 className="text-base font-semibold text-white mt-1">
                    Risk Assessment
                  </h2>
                </div>

                <div className="flex justify-center py-8">

                  <div className="relative h-40 w-40 rounded-full border-[10px] border-red-500/20 flex items-center justify-center">

                    <div className="absolute inset-0 rounded-full border-[10px] border-red-500 border-r-transparent border-b-transparent rotate-45" />

                    <div className="text-center">
                      <p className="text-3xl font-semibold text-white">
                        {result.riskScore}%
                      </p>

                      <p className="text-[10px] uppercase tracking-wider text-red-400 font-semibold mt-1">
                        {result.riskLevel} Risk
                      </p>
                    </div>

                  </div>

                </div>

                <div className="border border-red-500/20 bg-red-500/5 rounded-lg p-4">

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400" />

                    <p className="text-xs font-semibold text-red-400">
                      Investigation Priority: HIGH
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Suspicious relationships identified within the selected
                    network require further investigation.
                  </p>

                </div>

              </div>

              {/* FINDINGS */}
              <div className="lg:col-span-3 bg-[#0b1220] border border-slate-800/80 rounded-xl p-6">

                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                    Automated Intelligence
                  </p>

                  <h2 className="text-base font-semibold text-white mt-1">
                    Key Findings
                  </h2>

                  <p className="text-xs text-slate-600 mt-1">
                    High-value patterns identified by the analysis engine.
                  </p>
                </div>

                <div className="space-y-3">

                  {result.findings.map((finding, index) => {
                    const style = getSeverityStyle(finding.severity)

                    return (
                      <div
                        key={index}
                        className="bg-[#070d17] border border-slate-800/80 rounded-lg p-4 hover:border-slate-700 transition"
                      >

                        <div className="flex gap-3">

                          <div className="pt-1.5">
                            <span
                              className={`block h-2 w-2 rounded-full ${style.dot}`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">

                              <h3 className="text-sm font-medium text-slate-200">
                                {finding.title}
                              </h3>

                              <span
                                className={`w-fit border px-2 py-0.5 rounded text-[10px] font-medium ${style.badge}`}
                              >
                                {finding.severity}
                              </span>

                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed mt-2">
                              {finding.description}
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  })}

                </div>

              </div>

            </section>

            {/* ACTIONS */}
            <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Investigation Actions
                  </h2>

                  <p className="text-xs text-slate-600 mt-1">
                    Continue investigation using the generated intelligence.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() => setPage("cases")}
                    className="px-3.5 py-2 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    View Case
                  </button>

                  <button
                    onClick={() => {
                      const savedCases = localStorage.getItem("criminal_network_cases")
                      
                      if (savedCases) {
                         const cases = JSON.parse(savedCases)
                         const currentCase = cases.find((item) => item.id === caseId) 
                         if (currentCase) {
                          setSelectedCase(currentCase)
                        }
                      }
                      setPage("reports")
                    }}
                    className="px-3.5 py-2 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    Generate Report
                  </button>

                  <button
                    onClick={() => setPage("network")}
                    className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition"
                  >
                    View Network →
                  </button>

                </div>

              </div>

            </section>

          </div>
        )}

        {/* EMPTY STATE */}
        {!result && !isAnalyzing && (
          <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-12 text-center">

            <div className="h-12 w-12 mx-auto rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400 text-lg">
              AI
            </div>

            <h2 className="text-base font-semibold text-white mt-5">
              Ready for Analysis
            </h2>

            <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
              Select an investigation and analysis operation above to identify
              network risks, relationships and suspicious patterns.
            </p>

          </section>
        )}

      </main>
    </div>
  )
}

export default Analysis