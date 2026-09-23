import { useState } from "react"

const colorConfig = {
  blue: {
    icon: "text-blue-400",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    line: "bg-blue-500",
    dot: "bg-blue-400",
    soft: "bg-blue-500/5",
  },

  purple: {
    icon: "text-purple-400",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    line: "bg-purple-500",
    dot: "bg-purple-400",
    soft: "bg-purple-500/5",
  },

  cyan: {
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    line: "bg-cyan-500",
    dot: "bg-cyan-400",
    soft: "bg-cyan-500/5",
  },

  red: {
    icon: "text-red-400",
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
    line: "bg-red-500",
    dot: "bg-red-400",
    soft: "bg-red-500/5",
  },
}

/*
  Automatic details for each dashboard card.
  Dashboard.jsx does NOT need to be changed.
*/
const cardDetails = {
  "Active Cases": [
    {
      label: "High Risk Cases",
      value: "8",
      color: "text-red-400",
    },
    {
      label: "Medium Risk Cases",
      value: "10",
      color: "text-yellow-400",
    },
    {
      label: "Low Risk Cases",
      value: "6",
      color: "text-emerald-400",
    },
    {
      label: "Cases Under Review",
      value: "5",
      color: "text-blue-400",
    },
  ],

  "Persons Identified": [
    {
      label: "Suspects",
      value: "42",
      color: "text-red-400",
    },
    {
      label: "Associates",
      value: "96",
      color: "text-purple-400",
    },
    {
      label: "Other Persons",
      value: "49",
      color: "text-cyan-400",
    },
    {
      label: "Recently Added",
      value: "18",
      color: "text-emerald-400",
    },
  ],

  "Network Connections": [
    {
      label: "Call Connections",
      value: "168",
      color: "text-blue-400",
    },
    {
      label: "Financial Links",
      value: "94",
      color: "text-emerald-400",
    },
    {
      label: "Known Associations",
      value: "121",
      color: "text-purple-400",
    },
    {
      label: "Newly Detected",
      value: "49",
      color: "text-cyan-400",
    },
  ],

  "High Risk Alerts": [
    {
      label: "Critical Alerts",
      value: "4",
      color: "text-red-400",
    },
    {
      label: "High Priority",
      value: "8",
      color: "text-orange-400",
    },
    {
      label: "New Today",
      value: "3",
      color: "text-yellow-400",
    },
    {
      label: "Under Review",
      value: "5",
      color: "text-blue-400",
    },
  ],
}

function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel = "vs last week",
  color = "blue",
  sparkline = [],
}) {
  const [showDetails, setShowDetails] = useState(false)

  const theme =
    colorConfig[color] || colorConfig.blue

  const details =
    cardDetails[title] || []

  /*
    Only growth-style trends are green.
    High Risk Alerts remains red/orange.
  */
  const isAlertCard =
    title === "High Risk Alerts"

  const isPositive =
    !isAlertCard &&
    trend?.toString().startsWith("+")

  return (
    <>
      {/* =====================================================
          STAT CARD
      ====================================================== */}
      <div
        className="
          group relative
          overflow-hidden
          rounded-xl
          border border-slate-800
          bg-[#0f172a]
          px-5 py-4
          shadow-lg shadow-black/5
          transition-all duration-200
          hover:-translate-y-[1px]
          hover:border-slate-700
          hover:bg-[#111c31]
          hover:shadow-xl hover:shadow-black/10
        "
      >
        {/* Top accent */}
        <div
          className={`
            absolute left-0 top-0
            h-[2px] w-0
            ${theme.line}
            transition-all duration-300
            group-hover:w-full
          `}
        />

        {/* =================================================
            HEADER
        ================================================== */}
        <div className="flex items-start justify-between">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            <div
              className={`
                flex h-10 w-10
                shrink-0
                items-center justify-center
                rounded-lg
                border
                ${theme.iconBg}
                ${theme.iconBorder}
                ${theme.icon}
                transition-all duration-200
                group-hover:scale-105
              `}
            >
              <span className="text-lg leading-none">
                {icon}
              </span>
            </div>

            <div>
              <p className="text-[13px] font-medium text-slate-300">
                {title}
              </p>

              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-slate-600">
                Intelligence Overview
              </p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5">
            <span
              className={`
                h-1.5 w-1.5
                rounded-full
                ${theme.dot}
              `}
            />

            <span className="text-[9px] font-medium uppercase tracking-wider text-slate-600">
              Live
            </span>
          </div>
        </div>

        {/* =================================================
            VALUE
        ================================================== */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[32px] font-semibold leading-none tracking-tight text-white">
              {value}
            </p>

            <p className="mt-2 text-[11px] text-slate-500">
              {description}
            </p>
          </div>

          {/* Mini activity bars */}
          {sparkline?.length > 0 && (
            <div className="flex h-8 items-end gap-[3px]">
              {sparkline.map(
                (height, index) => (
                  <span
                    key={index}
                    className={`
                      w-[3px]
                      rounded-sm
                      ${theme.line}
                      opacity-30
                      transition-all duration-300
                      group-hover:opacity-80
                    `}
                    style={{
                      height: `${Math.max(
                        20,
                        height
                      )}%`,
                    }}
                  />
                )
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-800/80" />

        {/* =================================================
            FOOTER
        ================================================== */}
        <div className="flex items-center justify-between">
          {/* Trend */}
          <div className="flex items-center gap-2">
            <span
              className={`
                inline-flex
                items-center
                gap-1
                rounded-md
                border
                px-2 py-1
                text-[10px]
                font-semibold
                ${
                  isPositive
                    ? "border-emerald-500/15 bg-emerald-500/5 text-emerald-400"
                    : "border-red-500/15 bg-red-500/5 text-red-400"
                }
              `}
            >
              <span>
                {isPositive ? "↑" : "•"}
              </span>

              {trend}
            </span>

            <span className="text-[10px] text-slate-600">
              {trendLabel}
            </span>
          </div>

          {/* DETAILS BUTTON */}
          <button
            type="button"
            onClick={() =>
              setShowDetails(true)
            }
            className="
              cursor-pointer
              text-[10px]
              font-medium
              text-slate-500
              transition-all duration-200
              hover:translate-x-0.5
              hover:text-blue-400
              focus:outline-none
              focus:text-blue-400
            "
          >
            View details →
          </button>
        </div>
      </div>

      {/* =====================================================
          DETAILS MODAL
      ====================================================== */}
      {showDetails && (
        <div
          className="
            fixed inset-0
            z-[9999]
            flex items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setShowDetails(false)
          }
        >
          <div
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-2xl
              border border-slate-700
              bg-[#0b1220]
              shadow-2xl
              shadow-black/50
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal accent */}
            <div
              className={`
                h-[2px]
                w-full
                ${theme.line}
              `}
            />

            {/* =================================================
                MODAL HEADER
            ================================================== */}
            <div className="flex items-start justify-between border-b border-slate-800 px-6 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border
                    ${theme.iconBg}
                    ${theme.iconBorder}
                  `}
                >
                  <span className="text-xl">
                    {icon}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Investigation intelligence summary
                  </p>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() =>
                  setShowDetails(false)
                }
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-slate-800
                  hover:text-white
                "
              >
                ✕
              </button>
            </div>

            {/* =================================================
                MAIN SUMMARY
            ================================================== */}
            <div className="px-6 py-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                    Current Count
                  </p>

                  <p className="mt-1 text-4xl font-bold tracking-tight text-white">
                    {value}
                  </p>
                </div>

                <div
                  className={`
                    rounded-lg
                    border
                    px-3 py-2
                    ${
                      isPositive
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : "border-red-500/20 bg-red-500/5"
                    }
                  `}
                >
                  <p
                    className={`
                      text-xs font-semibold
                      ${
                        isPositive
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    `}
                  >
                    {isPositive
                      ? "↑"
                      : "•"}{" "}
                    {trend}
                  </p>

                  <p className="mt-0.5 text-[9px] text-slate-600">
                    {trendLabel}
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-xs leading-5 text-slate-400">
                {description}. The information below
                provides a quick operational breakdown
                for the investigation team.
              </p>
            </div>

            {/* =================================================
                BREAKDOWN
            ================================================== */}
            <div className="border-t border-slate-800 px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Intelligence Breakdown
                </p>

                <span className="text-[9px] text-slate-600">
                  Current snapshot
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {details.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="
                        rounded-lg
                        border border-slate-800
                        bg-slate-950/60
                        px-4 py-3
                        transition
                        hover:border-slate-700
                        hover:bg-slate-900
                      "
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">
                          {item.label}
                        </span>

                        <span
                          className={`
                            h-1.5 w-1.5
                            rounded-full
                            ${item.color.replace(
                              "text-",
                              "bg-"
                            )}
                          `}
                        />
                      </div>

                      <p
                        className={`
                          mt-2
                          text-xl
                          font-semibold
                          ${item.color}
                        `}
                      >
                        {item.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* =================================================
                STATUS
            ================================================== */}
            <div className="border-t border-slate-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        ${theme.dot}
                        opacity-40
                      `}
                    />

                    <span
                      className={`
                        relative
                        inline-flex
                        h-2
                        w-2
                        rounded-full
                        ${theme.dot}
                      `}
                    />
                  </span>

                  <span className="text-[10px] text-slate-500">
                    Live intelligence data
                  </span>
                </div>

                <span className="text-[10px] text-slate-600">
                  Updated just now
                </span>
              </div>
            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================== */}
            <div className="flex justify-end border-t border-slate-800 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowDetails(false)
                }
                className="
                  rounded-lg
                  border border-slate-700
                  bg-slate-800
                  px-4 py-2
                  text-xs
                  font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-700
                  hover:text-white
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StatCard