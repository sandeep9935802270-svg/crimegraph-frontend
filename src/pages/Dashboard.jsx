import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import NetworkGraph from "../components/NetworkGraph"
import AlertCard from "../components/AlertCard"

function Dashboard({ setPage }) {
  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar setPage={setPage} />

      <main className="p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">
            Investigation Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            AI-powered criminal network intelligence and analysis
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

          <StatCard
            title="Active Cases"
            value="24"
            icon="📁"
            description="Currently under investigation"
          />

          <StatCard
            title="Persons Identified"
            value="187"
            icon="👤"
            description="Across all investigations"
          />

          <StatCard
            title="Network Connections"
            value="432"
            icon="🔗"
            description="AI detected relationships"
          />

          <StatCard
            title="High Risk Alerts"
            value="12"
            icon="⚠️"
            description="Require immediate attention"
          />

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* Network Graph */}
          <div className="lg:col-span-2">
            <NetworkGraph />
          </div>

          {/* Recent Alerts */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

            <h2 className="text-lg font-semibold text-white mb-4">
              Recent Alerts
            </h2>

            <div className="space-y-4">

              <AlertCard
                type="High"
                title="Suspicious Network Activity"
                message="New connection detected between two high-risk persons."
                time="10 min ago"
              />

              <AlertCard
                type="Medium"
                title="New Criminal Association"
                message="AI identified a potential relationship in Case #1024."
                time="35 min ago"
              />

              <AlertCard
                type="Low"
                title="Profile Updated"
                message="New information added to suspect profile."
                time="1 hr ago"
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard