import { Bar } from "react-chartjs-2"

export function DashboardLineChart({ board, groups }) {
  const userCards = {}

  board.members.forEach((member) => {
    userCards[member.fullname] = 0
  })

  groups.forEach((group) =>
    group.cards.forEach((card) => {
      console.log(userCards[card.createdBy])
      if (userCards[card.createdBy]) {
        userCards[card.createdBy]++
      }
    })
  )

  const data = {
    labels: Object.keys(userCards),
    datasets: [
      {
        label: "Cards created by",
        data: Object.values(userCards),
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
      <h3>Cards created by</h3>
      <Bar data={data} options={options} />
    </div>
  )
}
