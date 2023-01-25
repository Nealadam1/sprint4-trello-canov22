import { useOutletContext } from "react-router"
import { Chart } from "react-chartjs-2"

export function BoardDashboard() {
  const { board } = useOutletContext()
  console.log(board)

  return (
    <div className="board-dashboard">
      <div></div>
    </div>
  )
}
