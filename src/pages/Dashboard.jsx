import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import NetworkGraph from "../components/NetworkGraph"
import AlertCard from "../components/AlertCard"

function Dashboard({ setPage }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">

      <Navbar setPage={setPage} />

      <main className="p-4 md:p-6 lg:p-8 max-w-[1800px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

          <div>
            <div className="flex items-center gap-2 mb-2">

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
                Intelligence Operations
              </span>

            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Investigation Dashboard
            </h1>

            <p className="text-sm md:text-base text-slate-400 mt-2 max-w-2xl">
              AI-powered criminal network intelligence and
              investigation analysis platform.
            </p>
          </div>

          {/* System status */}
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800">

              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>

              <span className="text-xs text-slate-300">
                System Operational
              </span>

            </div>

            <div className="hidden md:block text-right">
              <p className="text-[10px] text-slate-600 uppercase tracking-wider">
                Last updated
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Just now
              </p>
            </div>

          </div>

        </div>


        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <div className="group relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative">
              <StatCard
                title="Active Cases"
                value="24"
                icon="📁"
                description="Currently under investigation"
              />
            </div>
          </div>


          <div className="group relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative">
              <StatCard
                title="Persons Identified"
                value="187"
                icon="👤"
                description="Across all investigations"
              />
            </div>
          </div>


          <div className="group relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative">
              <StatCard
                title="Network Connections"
                value="432"
                icon="🔗"
                description="AI detected relationships"
              />
            </div>
          </div>


          <div className="group relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative">
              <StatCard
                title="High Risk Alerts"
                value="12"
                icon="⚠️"
                description="Require immediate attention"
              />
            </div>
          </div>

        </div>


        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ================= NETWORK ================= */}
          <div className="xl:col-span-2 min-w-0">

            <div className="relative">

              {/* Top accent */}
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

              <NetworkGraph />

            </div>

          </div>


          {/* ================= ALERT PANEL ================= */}
          <div className="min-w-0">

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-black/10">

              {/* Alert header */}
              <div className="p-5 border-b border-slate-800">

                <div className="flex items-center justify-between">

                  <div>
                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <span className="text-sm">
                          ⚠️
                        </span>
                      </div>

                      <div>
                        <h2 className="text-base font-semibold text-white">
                          Recent Alerts
                        </h2>

                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Real-time investigation events
                        </p>
                      </div>

                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-[10px] font-semibold text-red-400">
                    12 ACTIVE
                  </span>

                </div>

              </div>


              {/* Alerts */}
              <div className="p-4 space-y-3">

                <div className="group rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-red-500/20 transition-all duration-200">

                  <AlertCard
                    type="High"
                    title="Suspicious Network Activity"
                    message="New connection detected between two high-risk persons."
                    time="10 min ago"
                  />

                </div>


                <div className="group rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-yellow-500/20 transition-all duration-200">

                  <AlertCard
                    type="Medium"
                    title="New Criminal Association"
                    message="AI identified a potential relationship in Case #1024."
                    time="35 min ago"
                  />

                </div>


                <div className="group rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-blue-500/20 transition-all duration-200">

                  <AlertCard
                    type="Low"
                    title="Profile Updated"
                    message="New information added to suspect profile."
                    time="1 hr ago"
                  />

                </div>

              </div>


              {/* View all */}
              <div className="px-5 py-4 border-t border-slate-800">

                <button
                  type="button"
                  onClick={() => setPage("cases")}
                  className="w-full py-2.5 rounded-lg bg-slate-800/70 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white transition-all"
                >
                  View All Investigation Alerts
                  <span className="ml-2">
                    →
                  </span>
                </button>

              </div>

            </div>


            {/* ================= SYSTEM HEALTH ================= */}
            <div className="mt-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5">

              <div className="flex items-center justify-between mb-4">

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    System Health
                  </h3>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Platform service status
                  </p>
                </div>

                <span className="text-[10px] text-emerald-400 font-medium">
                  ALL SYSTEMS OK
                </span>

              </div>


              <div className="space-y-3">

                {/* Frontend */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-400">
                      Investigation Dashboard
                    </span>

                  </div>

                  <span className="text-[10px] text-emerald-400">
                    Operational
                  </span>

                </div>


                {/* AI Engine */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-400">
                      AI Analysis Engine
                    </span>

                  </div>

                  <span className="text-[10px] text-emerald-400">
                    Operational
                  </span>

                </div>


                {/* Graph */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-400">
                      Network Graph
                    </span>

                  </div>

                  <span className="text-[10px] text-emerald-400">
                    Connected
                  </span>

                </div>


                {/* Database */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2.5">

                    <span className="w-2 h-2 rounded-full bg-emerald-500" />

                    <span className="text-xs text-slate-400">
                      Case Database
                    </span>

                  </div>

                  <span className="text-[10px] text-emerald-400">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM INTELLIGENCE BAR ================= */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* AI Analysis */}
          <div className="group bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition">
                🧠
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  AI Analysis
                </p>

                <p className="text-sm font-semibold text-white mt-0.5">
                  94% Confidence
                </p>
              </div>

            </div>

          </div>


          {/* Network */}
          <div className="group bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-purple-500/30 transition-all">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/15 transition">
                🕸️
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Network Intelligence
                </p>

                <p className="text-sm font-semibold text-white mt-0.5">
                  47 Relationships Mapped
                </p>
              </div>

            </div>

          </div>


          {/* Security */}
          <div className="group bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/15 transition">
                🛡️
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Security Status
                </p>

                <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                  Secure & Monitored
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-6 pt-5 border-t border-slate-900">

          <p className="text-[10px] text-slate-600">
            CrimeGraph Intelligence Platform • Investigation Command Center
          </p>

          <p className="text-[10px] text-slate-700">
            AI-powered network analysis
          </p>

        </div>

      </main>

    </div>
  )
}

export default Dashboard