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

export function DashboardActivities({ board }) {
  const userActivities = {}

  board.activities.forEach((activity) => {
    if (!userActivities[activity.fullname]) {
      userActivities[activity.fullname] = 0
    }
    userActivities[activity.fullname]++
  })

  const data = {
    labels: Object.keys(userActivities),
    datasets: [
      {
        label: "Activities per user",
        data: Object.values(userActivities),
        backgroundColor: "#42526E",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <h3>Activities per user</h3>
      <Bar data={data} options={options} />
    </div>
  )
}
