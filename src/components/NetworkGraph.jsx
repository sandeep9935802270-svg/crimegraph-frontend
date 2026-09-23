import { useMemo, useRef, useState } from "react"

const INITIAL_NODES = [
  {
    id: "S1",
    name: "Primary Suspect",
    type: "Suspect",
    role: "Network Leader",
    risk: "High",
    location: "Kanpur",
    connections: 7,
    x: 50,
    y: 48,
  },
  {
    id: "P1",
    name: "Person A",
    type: "Person",
    role: "Close Associate",
    risk: "High",
    location: "Kanpur",
    connections: 4,
    x: 25,
    y: 25,
  },
  {
    id: "P2",
    name: "Person B",
    type: "Person",
    role: "Financial Link",
    risk: "Medium",
    location: "Lucknow",
    connections: 3,
    x: 76,
    y: 25,
  },
  {
    id: "P3",
    name: "Person C",
    type: "Person",
    role: "Associate",
    risk: "Low",
    location: "Farrukhabad",
    connections: 2,
    x: 20,
    y: 73,
  },
  {
    id: "P4",
    name: "Person D",
    type: "Person",
    role: "Unknown Link",
    risk: "Medium",
    location: "Delhi",
    connections: 3,
    x: 80,
    y: 73,
  },
  {
    id: "P5",
    name: "Person E",
    type: "Person",
    role: "Suspected Associate",
    risk: "High",
    location: "Kanpur",
    connections: 4,
    x: 50,
    y: 13,
  },
  {
    id: "L1",
    name: "Kanpur Location",
    type: "Location",
    role: "Frequent Meeting Point",
    risk: "Medium",
    location: "Kanpur",
    connections: 3,
    x: 38,
    y: 88,
  },
  {
    id: "L2",
    name: "Lucknow Location",
    type: "Location",
    role: "Financial Activity",
    risk: "Low",
    location: "Lucknow",
    connections: 2,
    x: 63,
    y: 88,
  },
  {
    id: "C1",
    name: "CASE-1024",
    type: "Case",
    role: "Active Investigation",
    risk: "High",
    location: "Kanpur",
    connections: 4,
    x: 92,
    y: 48,
  },
]

const INITIAL_EDGES = [
  {
    source: "S1",
    target: "P1",
    label: "CALL",
    risk: "High",
  },
  {
    source: "S1",
    target: "P2",
    label: "TRANSFER",
    risk: "Medium",
  },
  {
    source: "S1",
    target: "P3",
    label: "CONNECTED",
    risk: "Low",
  },
  {
    source: "S1",
    target: "P4",
    label: "CALL",
    risk: "Medium",
  },
  {
    source: "S1",
    target: "P5",
    label: "MEMBER_OF",
    risk: "High",
  },
  {
    source: "P1",
    target: "P3",
    label: "CONNECTED",
    risk: "Low",
  },
  {
    source: "P2",
    target: "P4",
    label: "TRANSFER",
    risk: "Medium",
  },
  {
    source: "P1",
    target: "L1",
    label: "VISITED",
    risk: "Medium",
  },
  {
    source: "S1",
    target: "L1",
    label: "VISITED",
    risk: "High",
  },
  {
    source: "P2",
    target: "L2",
    label: "VISITED",
    risk: "Low",
  },
  {
    source: "S1",
    target: "C1",
    label: "LINKED_TO",
    risk: "High",
  },
  {
    source: "P5",
    target: "C1",
    label: "MENTIONED_IN",
    risk: "High",
  },
]

function NetworkGraph() {
  const [nodes, setNodes] = useState(INITIAL_NODES)
  const [selectedNode, setSelectedNode] = useState(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [search, setSearch] = useState("")
  const [zoom, setZoom] = useState(1)
  const [dragging, setDragging] = useState(null)

  const graphRef = useRef(null)

  /*
   * Search matching nodes
   */
  const searchMatchIds = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return new Set()
    }

    return new Set(
      nodes
        .filter(
          (node) =>
            node.name.toLowerCase().includes(query) ||
            node.type.toLowerCase().includes(query) ||
            node.role.toLowerCase().includes(query) ||
            node.location.toLowerCase().includes(query)
        )
        .map((node) => node.id)
    )
  }, [nodes, search])

  /*
   * IMPORTANT:
   *
   * Search/hover/selected node ke direct connected
   * nodes ko bhi active/highlight karna.
   */
  const connectedNodeIds = useMemo(() => {
    const activeIds = new Set()

    if (hoveredNode) {
      activeIds.add(hoveredNode)
    }

    if (selectedNode?.id) {
      activeIds.add(selectedNode.id)
    }

    searchMatchIds.forEach((id) => {
      activeIds.add(id)
    })

    if (activeIds.size === 0) {
      return new Set()
    }

    const ids = new Set(activeIds)

    INITIAL_EDGES.forEach((edge) => {
      if (activeIds.has(edge.source)) {
        ids.add(edge.target)
      }

      if (activeIds.has(edge.target)) {
        ids.add(edge.source)
      }
    })

    return ids
  }, [hoveredNode, selectedNode, searchMatchIds])

  const getRiskColor = (risk) => {
    if (risk === "High") return "#ef4444"
    if (risk === "Medium") return "#facc15"

    return "#22c55e"
  }

  const getRiskGlow = (risk) => {
    if (risk === "High") {
      return "rgba(239,68,68,0.95)"
    }

    if (risk === "Medium") {
      return "rgba(250,204,21,0.90)"
    }

    return "rgba(34,197,94,0.85)"
  }

  const getRiskAnimation = (risk) => {
    if (risk === "High") {
      return "riskPulseHigh 0.9s ease-in-out infinite, riskDashHigh 0.8s linear infinite"
    }

    if (risk === "Medium") {
      return "riskPulseMedium 1.3s ease-in-out infinite, riskDashMedium 1.1s linear infinite"
    }

    return "riskPulseLow 1.8s ease-in-out infinite, riskDashLow 1.6s linear infinite"
  }

  /*
   * Edge belongs to active network
   */
  const isEdgeHighlighted = (edge) => {
    if (hoveredNode) {
      return (
        edge.source === hoveredNode ||
        edge.target === hoveredNode
      )
    }

    if (selectedNode?.id) {
      return (
        edge.source === selectedNode.id ||
        edge.target === selectedNode.id
      )
    }

    if (searchMatchIds.size > 0) {
      return (
        searchMatchIds.has(edge.source) ||
        searchMatchIds.has(edge.target)
      )
    }

    return false
  }

  const handlePointerDown = (event, node) => {
    event.preventDefault()

    const rect =
      graphRef.current?.getBoundingClientRect()

    if (!rect) return

    setDragging({
      id: node.id,
      rect,
    })

    setSelectedNode(node)
  }

  const handlePointerMove = (event) => {
    if (!dragging) return

    const { rect, id } = dragging

    const x =
      ((event.clientX - rect.left) / rect.width) * 100

    const y =
      ((event.clientY - rect.top) / rect.height) * 100

    const nextX = Math.min(
      96,
      Math.max(4, x)
    )

    const nextY = Math.min(
      94,
      Math.max(6, y)
    )

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              x: nextX,
              y: nextY,
            }
          : node
      )
    )
  }

  const handlePointerUp = () => {
    setDragging(null)
  }

  const resetGraph = () => {
    setNodes(INITIAL_NODES)
    setZoom(1)
    setSearch("")
    setSelectedNode(null)
    setHoveredNode(null)
  }

  const zoomIn = () => {
    setZoom((value) =>
      Math.min(
        1.8,
        Number((value + 0.1).toFixed(1))
      )
    )
  }

  const zoomOut = () => {
    setZoom((value) =>
      Math.max(
        0.7,
        Number((value - 0.1).toFixed(1))
      )
    )
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-800 bg-slate-900 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-white">
              Criminal Relationship Network
            </h2>

            <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              LIVE GRAPH
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Interactive network visualization of suspects,
            people, locations and cases
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          {/* SEARCH */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search network..."
              className="w-52 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 pl-9 text-sm text-white outline-none transition focus:border-blue-500"
            />

            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          {/* ZOOM */}
          <div className="flex items-center overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
            <button
              onClick={zoomOut}
              className="px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              −
            </button>

            <span className="border-x border-slate-700 px-3 py-2 text-xs text-slate-400">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              +
            </button>
          </div>

          <button
            onClick={resetGraph}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap items-center gap-5 border-b border-slate-800 bg-slate-950/60 px-5 py-3">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Network Risk
        </span>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          High
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          Medium
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          Low
        </div>
      </div>

      {/* GRAPH */}
      <div
        ref={graphRef}
        className="relative h-[460px] overflow-hidden rounded-xl bg-slate-950 select-none"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(51,65,85,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(51,65,85,0.25) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* CENTER GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />

        <div
          className="absolute inset-0 origin-center transition-transform duration-200"
          style={{
            transform: `scale(${zoom})`,
          }}
        >

          {/* EDGES */}
          <svg className="absolute inset-0 h-full w-full overflow-visible">
            {INITIAL_EDGES.map((edge, index) => {
              const source = nodes.find(
                (node) => node.id === edge.source
              )

              const target = nodes.find(
                (node) => node.id === edge.target
              )

              if (!source || !target) {
                return null
              }

              const highlighted =
                isEdgeHighlighted(edge)

              const activeInteraction =
                hoveredNode ||
                selectedNode ||
                searchMatchIds.size > 0

              /*
               * Active connected edge = full brightness
               * Other edges = fade
               */
              const opacity =
                activeInteraction
                  ? highlighted
                    ? 1
                    : 0.07
                  : 0.70

              const riskColor =
                getRiskColor(edge.risk)

              const riskGlow =
                getRiskGlow(edge.risk)

              return (
                <g
                  key={`${edge.source}-${edge.target}-${index}`}
                  style={{
                    opacity,
                    transition:
                      "opacity 0.25s ease",
                  }}
                >

                  {/* GLOW */}
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={riskGlow}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray="5 7"
                    style={{
                      animation:
                        getRiskAnimation(
                          edge.risk
                        ),
                      filter:
                        `drop-shadow(0 0 5px ${riskGlow})`,
                    }}
                  />

                  {/* MAIN THIN LINE */}
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={riskColor}
                    strokeWidth={2}
                    strokeLinecap="round"
                    style={{
                      filter:
                        `drop-shadow(0 0 4px ${riskGlow})`,
                    }}
                  />

                  {/* SHINING DASH */}
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={riskColor}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeDasharray="2 14"
                    style={{
                      opacity:
                        highlighted ? 1 : 0.5,
                      animation:
                        getRiskAnimation(
                          edge.risk
                        ),
                      filter:
                        `drop-shadow(0 0 4px ${riskGlow})`,
                    }}
                  />

                  {/* LABEL */}
                  <text
                    x={`${
                      (source.x + target.x) / 2
                    }%`}
                    y={`${
                      (source.y + target.y) / 2
                    }%`}
                    fill={
                      highlighted
                        ? "#e2e8f0"
                        : "#475569"
                    }
                    fontSize="9"
                    fontWeight={
                      highlighted
                        ? "600"
                        : "400"
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none"
                  >
                    {edge.label}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* NODES */}
          {/*
           * VERY IMPORTANT:
           *
           * Yahan `filteredNodes.map` NAHI hai.
           *
           * `nodes.map` use kiya hai so that connected nodes
           * search ke baad bhi graph mein visible rahen.
           */}
          {nodes.map((node) => {
            const isHovered =
              hoveredNode === node.id

            const isSelected =
              selectedNode?.id === node.id

            const isSearchMatch =
              searchMatchIds.has(node.id)

            const hasInteraction =
              hoveredNode ||
              selectedNode ||
              searchMatchIds.size > 0

            const isConnected =
              connectedNodeIds.has(node.id)

            /*
             * Search result + direct connected nodes
             * = FULL OPACITY
             *
             * Unrelated nodes
             * = FADE
             */
            const nodeOpacity =
              hasInteraction
                ? isConnected
                  ? 1
                  : 0.12
                : 1

            const riskColor =
              getRiskColor(node.risk)

            /*
             * Main highlight
             */
            const shouldHighlight =
              hasInteraction &&
              isConnected

            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform:
                    "translate(-50%, -50%)",
                  opacity: nodeOpacity,
                  transition:
                    "opacity 0.25s ease",
                  zIndex:
                    shouldHighlight
                      ? 30
                      : 10,
                }}
                onPointerEnter={() =>
                  setHoveredNode(node.id)
                }
                onPointerLeave={() =>
                  setHoveredNode(null)
                }
              >
                <button
                  type="button"
                  onPointerDown={(event) =>
                    handlePointerDown(
                      event,
                      node
                    )
                  }
                  onClick={() =>
                    setSelectedNode(node)
                  }
                  className="group relative flex flex-col items-center outline-none"
                >

                  {/* NODE CIRCLE */}
                  <div
                    className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-slate-900 shadow-lg transition-transform duration-200 group-hover:scale-110"
                    style={{
                      borderColor:
                        riskColor,

                      /*
                       * SEARCHED NODE + CONNECTED NODE
                       * same blue outer highlight
                       */
                      boxShadow:
                        shouldHighlight
                          ? `0 0 0 4px rgba(59,130,246,0.22),
                             0 0 15px rgba(59,130,246,0.95),
                             0 0 30px rgba(59,130,246,0.75),
                             0 0 45px rgba(59,130,246,0.35)`
                          : `0 0 10px ${getRiskGlow(
                              node.risk
                            )}`,

                      transform:
                        shouldHighlight
                          ? "scale(1.12)"
                          : "scale(1)",
                    }}
                  >

                    {/* CENTER */}
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          riskColor,
                        boxShadow:
                          `0 0 10px ${riskColor}`,
                      }}
                    />

                    {/* SUSPECT ROTATING RING */}
                    {node.type ===
                      "Suspect" && (
                      <div
                        className="absolute inset-[-5px] rounded-full border border-dashed opacity-60"
                        style={{
                          borderColor:
                            riskColor,
                          animation:
                            "nodeRotate 5s linear infinite",
                        }}
                      />
                    )}

                    {/* ACTIVE BLUE RING */}
                    {shouldHighlight && (
                      <div
                        className="absolute inset-[-8px] rounded-full border-2 border-blue-400"
                        style={{
                          animation:
                            "networkHighlight 1.3s ease-in-out infinite",
                        }}
                      />
                    )}
                  </div>

                  {/* NODE TEXT */}
                  <div className="mt-2 whitespace-nowrap text-center">

                    <div
                      className={`text-xs font-semibold ${
                        shouldHighlight
                          ? "text-blue-300"
                          : "text-white"
                      }`}
                    >
                      {node.name}
                    </div>

                    <div
                      className={`mt-0.5 text-[10px] ${
                        shouldHighlight
                          ? "text-blue-200/80"
                          : "text-slate-500"
                      }`}
                    >
                       {node.type} •{" "}
{INITIAL_EDGES.filter(
  (edge) =>
    edge.source === node.id ||
    edge.target === node.id
).length}{" "}
connections
                    </div>

                  </div>
                </button>
              </div>
            )
          })}
        </div>

        {/* SELECTED NODE DETAILS */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 w-64 rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">

            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">
                  {selectedNode.name}
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  {selectedNode.type}
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedNode(null)
                }
                className="text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-4 space-y-2">

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">
                  Role
                </span>

                <span className="text-slate-300">
                  {selectedNode.role}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">
                  Location
                </span>

                <span className="text-slate-300">
                  {selectedNode.location}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">
                  Connections
                </span>

                <span className="text-slate-300">
                  {selectedNode.connections}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-500">
                  Risk
                </span>

                <span
                  className="font-medium"
                  style={{
                    color: getRiskColor(
                      selectedNode.risk
                    ),
                  }}
                >
                  {selectedNode.risk}
                </span>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* CSS */}
      <style>{`

        /* HIGH - RED */

        @keyframes riskPulseHigh {
          0% {
            opacity: 0.25;
            filter:
              drop-shadow(0 0 1px rgba(239,68,68,0.2));
          }

          50% {
            opacity: 1;
            filter:
              drop-shadow(0 0 10px rgba(239,68,68,1));
          }

          100% {
            opacity: 0.25;
            filter:
              drop-shadow(0 0 1px rgba(239,68,68,0.2));
          }
        }

        @keyframes riskDashHigh {
          to {
            stroke-dashoffset: -28;
          }
        }


        /* MEDIUM - YELLOW */

        @keyframes riskPulseMedium {
          0% {
            opacity: 0.30;
            filter:
              drop-shadow(0 0 1px rgba(250,204,21,0.2));
          }

          50% {
            opacity: 1;
            filter:
              drop-shadow(0 0 9px rgba(250,204,21,1));
          }

          100% {
            opacity: 0.30;
            filter:
              drop-shadow(0 0 1px rgba(250,204,21,0.2));
          }
        }

        @keyframes riskDashMedium {
          to {
            stroke-dashoffset: -24;
          }
        }


        /* LOW - GREEN */

        @keyframes riskPulseLow {
          0% {
            opacity: 0.35;
            filter:
              drop-shadow(0 0 1px rgba(34,197,94,0.2));
          }

          50% {
            opacity: 0.95;
            filter:
              drop-shadow(0 0 8px rgba(34,197,94,0.9));
          }

          100% {
            opacity: 0.35;
            filter:
              drop-shadow(0 0 1px rgba(34,197,94,0.2));
          }
        }

        @keyframes riskDashLow {
          to {
            stroke-dashoffset: -20;
          }
        }


        /* CONNECTED NETWORK HIGHLIGHT */

        @keyframes networkHighlight {
          0% {
            transform: scale(0.94);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(0.94);
            opacity: 0.35;
          }
        }


        /* SUSPECT RING */

        @keyframes nodeRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

      `}</style>
    </div>
  )
}

export default NetworkGraph