import { useOutletContext } from "react-router"
import { DashboardActivities } from "./dashboard-charts/dashboard-activities"
import { DashboardDoughnutChart } from "./dashboard-charts/dashboard-doughnut-chart"

export function BoardDashboard() {
  const { board, groups } = useOutletContext()

  return (
    <div className="dashboard">
      <div className="board-info-one"></div>
      <div className="board-info-two"></div>
      <div className="board-info-three"></div>
      <div className="board-info-four"></div>
      <div className="doughnut-dashboard">
        <DashboardDoughnutChart
          labels={board.labels}
          board={board}
          groups={groups}
        />
      </div>
      <div className="line-dashbaord">
        <DashboardActivities board={board} />
      </div>

      {/*<div className="board-dashboard">
        <DashboardDoughnutChart
          labels={board.labels}
          board={board}
          groups={groups}
        />
      </div>
      <div className="board-dashboard">
      </div>
      <div className="board-dashboard">
        <DashboardLineChart board={board} groups={groups} />
      </div> */}
    </div>
  )
}
