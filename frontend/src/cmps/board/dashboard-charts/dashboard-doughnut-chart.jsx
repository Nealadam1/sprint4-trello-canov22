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

export function DashboardDoughnutChart({ groups, labels }) {
  const cardLabels = {}
  if (!groups || !labels) {
    return <div>Loading...</div>
  } else {
    groups.forEach((group) => {
      group.cards.forEach((card) => {
        card.labelIds.forEach((labelId) => {
          const label = labels.find((l) => l.id === labelId)
          console.log(label)
          if (!cardLabels[label.title]) {
            cardLabels[label.title] = 0
          }
          cardLabels[label.title]++
        })
      })
    })
  }

  const labelsNames = Object.keys(cardLabels)
  const data = Object.values(cardLabels)

  const chartData = {
    labels: labelsNames,
    datasets: [
      {
        label: "Card per label",
        data: data,
        backgroundColor: "#42526E",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    legend: {
      position: "bottom",
      labels: {
        fontColor: "black",
        fontSize: 14,
      },
    },
  }

  return (
    <div>
      <h3>Cards per label</h3>
      <Bar data={chartData} options={options} />
    </div>
  )
}
