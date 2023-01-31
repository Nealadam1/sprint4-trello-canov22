import { useOutletContext } from "react-router"
import { DashboardActivities } from "./dashboard-charts/dashboard-activities"
import { DashboardDoughnutChart } from "./dashboard-charts/dashboard-doughnut-chart"

export function BoardDashboard() {
  const { board, groups } = useOutletContext()

  console.log(board)

  function getAverageCompletionPercentage(board) {
    let totalTodos = 0
    let totalCompletedTodos = 0

    for (let i = 0; i < board?.groups?.length; i++) {
      const group = board?.groups[i]
      for (let j = 0; j < group.cards.length; j++) {
        const card = group.cards[j]
        for (let k = 0; k < card.checklists.length; k++) {
          const checklist = card.checklists[k]
          for (let l = 0; l < checklist.todos.length; l++) {
            const todo = checklist.todos[l]
            totalTodos++
            if (todo.isDone) {
              totalCompletedTodos++
            }
          }
        }
      }
    }

    return (totalCompletedTodos / totalTodos) * 100
  }

  function getDueDateCompletionPercentage(board) {
    let totalCards = 0
    let totalCardsWithDueDate = 0
    let totalCardsWithDueDatePassed = 0

    for (let i = 0; i < board?.groups?.length; i++) {
      const group = board?.groups[i]
      for (let j = 0; j < group.cards.length; j++) {
        const card = group.cards[j]
        totalCards++
        if (card.dueDate) {
          totalCardsWithDueDate++
          if (card.dueDate < Date.now()) {
            totalCardsWithDueDatePassed++
          }
        }
      }
    }

    return totalCardsWithDueDate
      ? (totalCardsWithDueDatePassed / totalCardsWithDueDate) * 100
      : 0
  }

  console.log(getDueDateCompletionPercentage(board))

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
