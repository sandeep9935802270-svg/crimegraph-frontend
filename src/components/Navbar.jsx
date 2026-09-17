function Navbar({ setPage }) {
  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">

        <div>
          <h1
            onClick={() => setPage("dashboard")}
            className="text-xl font-bold text-white cursor-pointer"
          >
            AI-Criminal Network Analysis
          </h1>

          <p className="text-xs text-slate-400">
            Intelligence & Investigation Platform
          </p>
        </div>

        <div className="flex items-center gap-6">

          <button
            onClick={() => setPage("dashboard")}
            className="text-slate-300 hover:text-blue-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("cases")}
            className="text-slate-300 hover:text-blue-400"
          >
            Cases
          </button>

          <button
            onClick={() => setPage("analysis")}
            className="text-slate-300 hover:text-blue-400"
          >
            Analysis
          </button>

          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            A
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar