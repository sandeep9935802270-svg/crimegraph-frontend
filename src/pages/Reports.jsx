import Navbar from "../components/Navbar"

function SectionTitle({ number, title, description }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="h-7 w-7 shrink-0 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-semibold text-blue-400">
        {number}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white">
          {title}
        </h2>

        {description && (
          <p className="text-xs text-slate-500 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function InfoCard({ label, value, subtext }) {
  return (
    <div className="report-dark-card bg-[#0a101c] border border-slate-800/80 rounded-lg p-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
        {label}
      </p>

      <p className="text-sm font-semibold text-white mt-2">
        {value}
      </p>

      {subtext && (
        <p className="text-[11px] text-slate-400 mt-1">
          {subtext}
        </p>
      )}
    </div>
  )
}

function RiskCard({ label, value, color = "text-white" }) {
  return (
    <div className="report-dark-card bg-[#0a101c] border border-slate-800/80 rounded-lg p-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
        {label}
      </p>

      <p className={`text-2xl font-semibold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  )
}

function Finding({ title, description, severity }) {
  const severityStyle =
    severity === "High"
      ? "text-red-400 bg-red-500/10 border-red-500/20"
      : "text-amber-400 bg-amber-500/10 border-amber-500/20"

  return (
    <div className="report-dark-card border border-slate-800/80 rounded-lg p-4 bg-[#0a101c]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <span
          className={`w-fit px-2 py-1 rounded-md border text-[10px] font-semibold ${severityStyle}`}
        >
          {severity}
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-5 mt-2">
        {description}
      </p>
    </div>
  )
}

function NetworkRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-800/60 last:border-0">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  )
}

function Recommendation({ number, children }) {
  return (
    <div className="flex gap-3">
      <div className="h-6 w-6 shrink-0 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-semibold text-blue-400">
        {number}
      </div>

      <p className="text-xs text-slate-400 leading-5 pt-0.5">
        {children}
      </p>
    </div>
  )
}

function Reports({ setPage, selectedCase }) {
  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-[#060b14] text-white">
        <Navbar setPage={setPage} />

        <main className="max-w-[1200px] mx-auto px-5 sm:px-6 py-8">
          <button
            onClick={() => setPage("cases")}
            className="mb-5 text-xs text-slate-500 hover:text-blue-400 transition"
          >
            ← Back to Cases
          </button>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-10 text-center">
            <div className="h-11 w-11 mx-auto rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
              IR
            </div>

            <h2 className="text-lg font-semibold text-white mt-4">
              No Case Selected
            </h2>

            <p className="text-xs text-slate-500 mt-2">
              Select a case before generating an investigation report.
            </p>

            <button
              onClick={() => setPage("cases")}
              className="mt-5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium transition"
            >
              Open Cases
            </button>
          </div>
        </main>
      </div>
    )
  }

  const reportDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <Navbar setPage={setPage} />

      <main className="max-w-[1450px] mx-auto px-5 sm:px-6 lg:px-8 py-7">
        
        {/* PAGE HEADER */}
        <section className="mb-6 no-print">
          <button
            onClick={() => setPage("analysis")}
            className="text-xs text-slate-500 hover:text-blue-400 transition mb-4"
          >
            ← Back to Analysis
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                <p className="text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
                  Investigation Report
                </p>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Intelligence Report
              </h1>

              <p className="text-sm text-slate-500 mt-2">
                {selectedCase.title} · {selectedCase.id}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="w-fit px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition"
            >
              Print / Save PDF
            </button>
          </div>
        </section>

        {/* REPORT DOCUMENT */}
        <div
          id="investigation-report"
          className="bg-[#0b1220] border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl"
        >

          {/* REPORT HEADER */}
          <header className="px-6 sm:px-8 lg:px-10 py-8 border-b border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                    CG
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
                      CrimeGraph
                    </p>

                    <p className="text-[11px] text-slate-500 mt-0.5">
                      AI Criminal Network Analysis Platform
                    </p>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-7">
                  Investigation Intelligence Report
                </h1>

                <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                  AI-assisted analysis of entities, relationships, risk
                  indicators and suspicious network activity.
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                  Report Date
                </p>

                <p className="text-sm font-medium text-white mt-1">
                  {reportDate}
                </p>

                <p className="text-[11px] text-slate-600 mt-3">
                  Generated by CrimeGraph AI Engine
                </p>
              </div>

            </div>
          </header>

          <div className="p-6 sm:p-8 lg:p-10 space-y-9">

            {/* CASE SUMMARY */}
            <section>
              <SectionTitle
                number="01"
                title="Case Summary"
                description="Core information associated with the investigation."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                <InfoCard
                  label="Case ID"
                  value={selectedCase.id}
                  subtext="Investigation identifier"
                />

                <InfoCard
                  label="Case"
                  value={selectedCase.title}
                  subtext="Investigation title"
                />

                <InfoCard
                  label="Location"
                  value={selectedCase.location}
                  subtext="Primary investigation area"
                />

                <InfoCard
                  label="Status"
                  value={selectedCase.status}
                  subtext={`${selectedCase.suspects} suspected entities`}
                />

              </div>
            </section>

            {/* AI RISK ASSESSMENT */}
            <section>
              <SectionTitle
                number="02"
                title="AI Risk Assessment"
                description="Risk indicators generated from the analyzed network."
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <RiskCard
                  label="Risk Score"
                  value="87 / 100"
                  color="text-red-400"
                />

                <RiskCard
                  label="Risk Level"
                  value="HIGH"
                  color="text-red-400"
                />

                <RiskCard
                  label="AI Confidence"
                  value="94%"
                  color="text-emerald-400"
                />

              </div>
            </section>

            {/* KEY FINDINGS */}
            <section>
              <SectionTitle
                number="03"
                title="AI Key Findings"
                description="Important patterns detected during network analysis."
              />

              <div className="space-y-3">
                
                <Finding
                  title="Strong Network Leader"
                  severity="High"
                  description="Person A has the highest connectivity score and appears to be a central node in the detected criminal network."
                />

                <Finding
                  title="Suspicious Financial Activity"
                  severity="High"
                  description="Multiple financial relationships were detected between high-risk entities within the selected investigation."
                />

                <Finding
                  title="Hidden Association Detected"
                  severity="Medium"
                  description="AI identified a previously unknown relationship between Person B and Person D."
                />

              </div>
            </section>

            {/* NETWORK INTELLIGENCE */}
            <section>
              <SectionTitle
                number="04"
                title="Network Intelligence"
                description="Structural characteristics of the analyzed entity network."
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <div className="report-dark-card bg-[#0a101c] border border-slate-800/80 rounded-lg p-5">
                  <h3 className="text-xs font-semibold text-white mb-3">
                    Network Metrics
                  </h3>

                  <NetworkRow
                    label="Detected entities"
                    value="18"
                  />

                  <NetworkRow
                    label="Total relationships"
                    value="47"
                  />

                  <NetworkRow
                    label="Suspicious connections"
                    value="6"
                  />

                  <NetworkRow
                    label="High-risk entities"
                    value="6"
                  />
                </div>

                <div className="report-dark-card bg-[#0a101c] border border-slate-800/80 rounded-lg p-5">
                  <h3 className="text-xs font-semibold text-white mb-3">
                    Intelligence Summary
                  </h3>

                  <p className="text-xs text-slate-400 leading-6">
                    The analyzed network contains multiple interconnected
                    entities with several high-risk relationships. Centrality
                    analysis indicates the presence of highly connected nodes
                    that may require priority investigation.
                  </p>

                  <div className="mt-4 px-3 py-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <p className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold">
                      AI Assessment
                    </p>

                    <p className="text-xs text-slate-400 mt-1 leading-5">
                      Network structure indicates a potentially coordinated
                      pattern of activity requiring further investigation.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* RECOMMENDATIONS */}
            <section>
              <SectionTitle
                number="05"
                title="Investigation Recommendations"
                description="Suggested next investigative actions based on AI findings."
              />

              <div className="report-dark-card bg-[#0a101c] border border-slate-800/80 rounded-lg p-5 space-y-4">
                
                <Recommendation number="01">
                  Prioritize investigation of the highest-connectivity entities
                  identified by the network analysis.
                </Recommendation>

                <Recommendation number="02">
                  Review financial relationships associated with the
                  high-risk entities and suspicious connections.
                </Recommendation>

                <Recommendation number="03">
                  Validate the newly detected associations using available
                  investigative evidence and trusted sources.
                </Recommendation>

                <Recommendation number="04">
                  Continuously update the network as new evidence and
                  relationships become available.
                </Recommendation>

              </div>
            </section>

            {/* DISCLAIMER */}
            <section className="pt-2">
              <div className="border-t border-slate-800/80 pt-5">
                
                <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-2">
                  Important Notice
                </p>

                <p className="text-[11px] text-slate-600 leading-5 max-w-4xl">
                  This report is generated using AI-assisted network analysis.
                  AI findings are intended to support investigative decision
                  making and should be independently verified by authorized
                  personnel before any operational or legal action is taken.
                </p>

              </div>
            </section>

          </div>

          {/* FOOTER */}
          <footer className="px-6 sm:px-8 lg:px-10 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            
            <p className="text-[10px] text-slate-600">
              CrimeGraph · Investigation Intelligence System
            </p>

            <p className="text-[10px] text-slate-600">
              Confidential · AI-Assisted Analysis
            </p>

          </footer>

        </div>
      </main>

      {/* PRINT STYLES */}
      <style>{`

        @media print {

          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: white !important;
            color: #111827 !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          nav,
          .no-print,
          button {
            display: none !important;
          }

          #investigation-report {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: #111827 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          /* Normal report text */
          #investigation-report h1,
          #investigation-report h2,
          #investigation-report h3 {
            color: #0f172a !important;
          }

          /* Dark containers */
          #investigation-report .report-dark-card {
            background: #0a101c !important;
            border-color: #334155 !important;
          }

          /* IMPORTANT:
             Make all text inside dark cards WHITE */
          #investigation-report .report-dark-card,
          #investigation-report .report-dark-card p,
          #investigation-report .report-dark-card span,
          #investigation-report .report-dark-card h3 {
            color: #ffffff !important;
          }

          /* Risk colors */
          #investigation-report .report-dark-card .text-red-400 {
            color: #f87171 !important;
          }

          #investigation-report .report-dark-card .text-emerald-400 {
            color: #34d399 !important;
          }

          #investigation-report .report-dark-card .text-amber-400 {
            color: #fbbf24 !important;
          }

          #investigation-report .report-dark-card .text-blue-400 {
            color: #60a5fa !important;
          }

          /* Keep section descriptions readable on white */
          #investigation-report section > div > p {
            color: #475569 !important;
          }

          /* Header text */
          #investigation-report header p,
          #investigation-report header h1 {
            color: #0f172a !important;
          }

          /* Section number */
          #investigation-report .text-blue-400 {
            color: #2563eb !important;
          }

          /* Recommendation text */
          #investigation-report .report-dark-card p {
            color: #ffffff !important;
          }

          /* Disclaimer */
          #investigation-report section:last-child p {
            color: #475569 !important;
          }

          /* Avoid breaking cards */
          #investigation-report section {
            break-inside: avoid;
          }

          #investigation-report .report-dark-card {
            break-inside: avoid;
          }

          #investigation-report header {
            break-after: avoid;
          }

        }

      `}</style>
    </div>
  )
}

export default Reports