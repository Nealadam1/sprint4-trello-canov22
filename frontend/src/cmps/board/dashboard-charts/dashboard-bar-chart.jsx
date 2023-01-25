import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export function DashboardBarChart({ board }) {
  const groupsNames = board.groups.map((group) => group.title)
  const groupCardCounts = board.groups.map((group) => group.cards.length)

  const data = {
    labels: groupsNames,
    datasets: [
      {
        label: "Cards per list",
        data: groupCardCounts,
        backgroundColor: "#42526E",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  }

  const options = {}

  return (
    <div>
      <h3>Cards per list</h3>
      <Bar data={data} options={options}></Bar>
    </div>
  )
}
