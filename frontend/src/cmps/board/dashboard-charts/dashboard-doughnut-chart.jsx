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

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  legend: {
    position: "left",
    labels: {
      fontColor: "#172b4d",
      fontSize: 14,
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
  maintainAspectRatio: false,
}

export function DashboardDoughnutChart({ labels, groups, board }) {
  const colorPalette = [
    "#3f51b5",
    "#f50057",
    "#009688",
    "#795548",
    "#4caf50",
    "#e91e63",
    "#8bc34a",
    "#9c27b0",
    "#cddc39",
    "#2196f3",
    "#ff5722",
    "#607d8b",
  ]

  const filteredGroups = board?.groups?.filter((group) => !group.archivedAt)
  const groupsNames = filteredGroups?.map((group) => group.title)
  const groupCardLength = filteredGroups?.map((group) => {
    const filteredCards = group.cards.filter((card) => !card.archivedAt)
    return filteredCards.length
  })

  const backgroundColors = colorPalette
    .slice(0, groupsNames.length)
    .map((color) => `${color}33`)
  const borderColors = colorPalette.slice(0, groupsNames.length)

  const data = {
    labels: groupsNames,
    datasets: [
      {
        label: "# of Votes",
        data: groupCardLength,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  }

  return <Pie data={data} options={options} />
}
