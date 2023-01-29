// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js"
// import { Bar } from "react-chartjs-2"

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// export function DashboardDoughnutChart({ groups, labels }) {
//   const cardLabels = {}
//   if (!groups || !labels) {
//     return <div>Loading...</div>
//   } else {
//     groups.forEach((group) => {
//       group?.cards?.forEach((card) => {
//         card?.labelIds?.forEach((labelId) => {
//           const label = labels.find((l) => l.id === labelId)
//           console.log(label)
//           if (!cardLabels[label?.title]) {
//             cardLabels[label?.title] = 0
//           }
//           cardLabels[label?.title]++
//         })
//       })
//     })
//   }

//   const labelsNames = Object.keys(cardLabels)
//   const data = Object.values(cardLabels)

//   const chartData = {
//     labels: labelsNames,
//     datasets: [
//       {
//         label: "Card per label",
//         data: data,
//         backgroundColor: "#42526E",
//         borderColor: "black",
//         borderWidth: 1,
//       },
//     ],
//   }

//   const options = {
//     legend: {
//       position: "bottom",
//       labels: {
//         fontColor: "black",
//         fontSize: 14,
//       },
//     },
//   }

//   return (
//     <div>
//       <h3>Cards per label</h3>
//       <Bar data={chartData} options={options} />
//     </div>
//   )
// }

import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

const options = {
  legend: {
    position: "right",
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
  },
  tooltips: {
    backgroundColor: "rgba(255,255,255,0.8)",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  maintainAspectRatio: false,
}

export function DashboardDoughnutChart() {
  return <Pie data={data} options={options} />
}
