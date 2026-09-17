function AlertCard({ type, title, message, time }) {
  const styles = {
    High: "border-red-500 bg-red-500/10",
    Medium: "border-yellow-500 bg-yellow-500/10",
    Low: "border-blue-500 bg-blue-500/10",
  }

  return (
    <div
      className={`border-l-4 rounded-lg p-4 ${styles[type] || styles.Low}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {type} ALERT
            </span>
          </div>

          <h3 className="text-white font-semibold mt-2">
            {title}
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            {message}
          </p>
        </div>

        <span className="text-xs text-slate-500">
          {time}
        </span>
      </div>
    </div>
  )
}

export default AlertCard