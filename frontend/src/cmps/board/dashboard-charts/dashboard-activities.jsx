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

const theme = {
  backgroundColor: "rgba(66, 82, 110, 0.2)",
  borderColor: "#42526E",
  borderWidth: 2,
  pointBackgroundColor: "#42526E",
  pointBorderColor: "#fff",
  pointHoverBackgroundColor: "#fff",
  pointHoverBorderColor: "#42526E",
}

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
        ...theme,
      },
    ],
  }

  const options = {
    legend: {
      display: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          fontColor: "#fff",
        },
      },
      x: {
        gridLines: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        ticks: {
          fontColor: "#fff",
        },
      },
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || ""
          if (label) {
            label += ": "
          }
          label += tooltipItem.yLabel
          return label
        },
      },
    },
  }

  return (
    <div>
      <h3 style={{ color: "#fff" }}>Activities per user</h3>
      <Bar data={data} options={options} />
    </div>
  )
}
