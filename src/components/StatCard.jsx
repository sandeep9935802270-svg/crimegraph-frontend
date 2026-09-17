function StatCard({ title, value, icon, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {value}
          </h2>

          <p className="text-xs text-slate-500 mt-2">
            {description}
          </p>
        </div>

        <div className="text-3xl">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard