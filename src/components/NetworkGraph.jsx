import { useState } from "react"

function NetworkGraph() {
  const [selectedNode, setSelectedNode] = useState(null)

  const nodes = [
    {
      id: "S",
      name: "Primary Suspect",
      role: "Network Leader",
      risk: "High",
      x: "50%",
      y: "48%",
      size: "w-20 h-20",
    },
    {
      id: "A",
      name: "Person A",
      role: "Associate",
      risk: "High",
      x: "20%",
      y: "22%",
      size: "w-14 h-14",
    },
    {
      id: "B",
      name: "Person B",
      role: "Financial Link",
      risk: "Medium",
      x: "80%",
      y: "22%",
      size: "w-14 h-14",
    },
    {
      id: "C",
      name: "Person C",
      role: "Associate",
      risk: "Low",
      x: "18%",
      y: "76%",
      size: "w-14 h-14",
    },
    {
      id: "D",
      name: "Person D",
      role: "Unknown Link",
      risk: "Medium",
      x: "82%",
      y: "76%",
      size: "w-14 h-14",
    },
    {
      id: "E",
      name: "Person E",
      role: "Suspected Associate",
      risk: "High",
      x: "50%",
      y: "10%",
      size: "w-14 h-14",
    },
  ]

  const riskStyles = {
    High: "bg-red-600 border-red-300 shadow-red-500/40",
    Medium: "bg-yellow-600 border-yellow-300 shadow-yellow-500/30",
    Low: "bg-green-600 border-green-300 shadow-green-500/30",
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Criminal Network
          </h2>

          <p className="text-sm text-slate-400">
            AI detected relationship network
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
            AI ANALYSIS
          </span>

          <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">
            18 ENTITIES
          </span>
        </div>

      </div>

      {/* Graph */}
      <div className="relative h-[400px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">

          {/* Primary → A */}
          <line
            x1="50%"
            y1="48%"
            x2="20%"
            y2="22%"
            stroke="currentColor"
            className="text-red-500"
            strokeWidth="2"
          />

          {/* Primary → B */}
          <line
            x1="50%"
            y1="48%"
            x2="80%"
            y2="22%"
            stroke="currentColor"
            className="text-yellow-500"
            strokeWidth="2"
          />

          {/* Primary → C */}
          <line
            x1="50%"
            y1="48%"
            x2="18%"
            y2="76%"
            stroke="currentColor"
            className="text-green-500"
            strokeWidth="2"
          />

          {/* Primary → D */}
          <line
            x1="50%"
            y1="48%"
            x2="82%"
            y2="76%"
            stroke="currentColor"
            className="text-yellow-500"
            strokeWidth="2"
          />

          {/* Primary → E */}
          <line
            x1="50%"
            y1="48%"
            x2="50%"
            y2="10%"
            stroke="currentColor"
            className="text-red-500"
            strokeWidth="3"
          />

          {/* A → C */}
          <line
            x1="20%"
            y1="22%"
            x2="18%"
            y2="76%"
            stroke="currentColor"
            className="text-slate-600"
            strokeWidth="1.5"
          />

          {/* B → D */}
          <line
            x1="80%"
            y1="22%"
            x2="82%"
            y2="76%"
            stroke="currentColor"
            className="text-slate-600"
            strokeWidth="1.5"
          />

        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setSelectedNode(node)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: node.x,
              top: node.y,
            }}
          >

            <div
              className={`${node.size} ${
                riskStyles[node.risk]
              } rounded-full border-2 flex items-center justify-center text-white font-bold text-xs shadow-lg transition-all duration-200 hover:scale-110`}
            >
              {node.id}
            </div>

            <div className="mt-1 whitespace-nowrap text-[10px] text-slate-300">
              {node.name}
            </div>

          </button>
        ))}

        {/* Selected Node Information */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 w-64 bg-slate-900/95 backdrop-blur border border-slate-700 rounded-lg p-4 shadow-xl">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-xs text-slate-500 uppercase">
                  Entity Profile
                </p>

                <h3 className="text-white font-semibold mt-1">
                  {selectedNode.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>

            </div>

            <div className="mt-3 space-y-2">

              <div className="flex justify-between">
                <span className="text-xs text-slate-500">
                  Role
                </span>

                <span className="text-xs text-white">
                  {selectedNode.role}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-xs text-slate-500">
                  Risk
                </span>

                <span
                  className={`text-xs font-medium ${
                    selectedNode.risk === "High"
                      ? "text-red-400"
                      : selectedNode.risk === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {selectedNode.risk}
                </span>
              </div>

            </div>

          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-2">

          <p className="text-[10px] text-slate-500 mb-2 uppercase">
            Risk Level
          </p>

          <div className="flex items-center gap-3">

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-[10px] text-slate-400">
                High
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="text-[10px] text-slate-400">
                Medium
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-slate-400">
                Low
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Network Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500">
            Entities
          </p>
          <p className="text-lg font-bold text-white mt-1">
            18
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500">
            Connections
          </p>
          <p className="text-lg font-bold text-blue-400 mt-1">
            47
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500">
            High Risk
          </p>
          <p className="text-lg font-bold text-red-400 mt-1">
            6
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-500">
            Confidence
          </p>
          <p className="text-lg font-bold text-green-400 mt-1">
            94%
          </p>
        </div>

      </div>

      <p className="text-xs text-slate-600 mt-3">
        Click any entity node to inspect its detected role and risk level.
      </p>

    </div>
  )
}

export default NetworkGraph