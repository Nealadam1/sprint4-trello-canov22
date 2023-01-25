import { useOutletContext } from "react-router"
import { DashboardBarChart } from "./dashboard-charts/dashboard-bar-chart"
import { Chart } from "react-chartjs-2"
import { DashboardDoughnutChart } from "./dashboard-charts/dashboard-doughnut-chart"
import { DashboardLineChart } from "./dashboard-charts/dashboard-line-chart"
import { DashboardActivities } from "./dashboard-charts/dashboard-activities"

export function BoardDashboard() {
  const { board, groups } = useOutletContext()

  return (
    <div className="dashboard">
      <div className="board-dashboard">
        <DashboardBarChart board={board} />
      </div>
      <div className="board-dashboard">
        <DashboardDoughnutChart
          labels={board.labels}
          board={board}
          groups={groups}
        />
      </div>
      <div className="board-dashboard">
        <DashboardActivities board={board} />
      </div>
      <div className="board-dashboard">
        <DashboardLineChart board={board} groups={groups} />
      </div>
    </div>
  )
}
