import Navbar from "../components/Navbar"
import NetworkGraph from "../components/NetworkGraph"

function NetworkView({ setPage }) {
  return (
    <div className="min-h-screen bg-[#060b14] text-white">
      <Navbar setPage={setPage} />

      <main className="max-w-[1500px] mx-auto px-5 sm:px-6 lg:px-8 py-7">

        {/* HEADER */}
        <section className="mb-6">
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
                  Network Intelligence
                </p>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Criminal Network Analysis
              </h1>

              <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                Visualize entities, relationships and high-risk connections
                identified during the investigation.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Network intelligence active
            </div>
          </div>
        </section>

        {/* NETWORK GRAPH */}
        <section className="bg-[#0b1220] border border-slate-800/80 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800/80">
            <h2 className="text-sm font-semibold text-white">
              Relationship Network
            </h2>

            <p className="text-xs text-slate-600 mt-1">
              Interactive view of detected entities and their relationships.
            </p>
          </div>

          <div className="p-4">
            <NetworkGraph />
          </div>
        </section>

        {/* NETWORK SUMMARY */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              Entities
            </p>
            <p className="text-2xl font-semibold text-white mt-2">
              18
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Network entities
            </p>
          </div>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              Connections
            </p>
            <p className="text-2xl font-semibold text-blue-400 mt-2">
              47
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Detected relationships
            </p>
          </div>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              High Risk
            </p>
            <p className="text-2xl font-semibold text-red-400 mt-2">
              6
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Suspicious entities
            </p>
          </div>

          <div className="bg-[#0b1220] border border-slate-800/80 rounded-xl p-5">
            <p className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              AI Confidence
            </p>
            <p className="text-2xl font-semibold text-emerald-400 mt-2">
              94%
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Analysis confidence
            </p>
          </div>

        </section>

      </main>
    </div>
  )
}

export default NetworkView