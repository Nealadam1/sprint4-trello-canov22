// import { ResponsiveBar } from "@nivo/bar"

// export function DashboardBarChart({ board }) {
//   const groupsNames = board.groups.map((group) => group.title)
//   const data = board.groups.map((group, index) => {
//     return { name: groupsNames[index], value: group.cards.length }
//   })

//   const fills = board.groups.map((group) => ({
//     match: { id: group.title },
//     id: group.title,
//   }))

//   const defs = board.groups.map((group, index) => {
//     return {
//       id: group.title,
//       type: "patternDots",
//       background: "inherit",
//       color: fills,
//       size: 4,
//       padding: 1,
//       stagger: true,
//     }
//   })
//   return (
//     <ResponsiveBar
//       data={data}
//       keys={["value", ...groupsNames]}
//       indexBy="name"
//       margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//       padding={0.3}
//       valueScale={{ type: "linear" }}
//       indexScale={{ type: "band", round: true }}
//       colors={{ scheme: "nivo" }}
//       defs={defs}
//       fill={fills}
//       borderColor={{
//         from: "color",
//         modifiers: [["darker", 1.6]],
//       }}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "country",
//         legendPosition: "middle",
//         legendOffset: 32,
//       }}
//       axisLeft={{
//         tickSize: 5,
//         tickPadding: 5,
//         tickRotation: 0,
//         legend: "food",
//         legendPosition: "middle",
//         legendOffset: -40,
//       }}
//       labelSkipWidth={12}
//       labelSkipHeight={12}
//       labelTextColor={{
//         from: "color",
//         modifiers: [["darker", 1.6]],
//       }}
//       legends={[
//         {
//           dataFrom: "keys",
//           anchor: "bottom-right",
//           direction: "column",
//           justify: false,
//           translateX: 120,
//           translateY: 0,
//           itemsSpacing: 2,
//           itemWidth: 100,
//           itemHeight: 20,
//           itemDirection: "left-to-right",
//           itemOpacity: 0.85,
//           symbolSize: 20,
//           effects: [
//             {
//               on: "hover",
//               style: {
//                 itemOpacity: 1,
//               },
//             },
//           ],
//         },
//       ]}
//       role="application"
//       ariaLabel="Nivo bar chart demo"
//       barAriaLabel={function (e) {
//         return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
//       }}
//     />
//   )
// }

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
  const groupsNames = board?.groups.map((group) => group.title)
  const groupCardCounts = board?.groups.map((group, index) => {
    return group.cards.length
  })
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
