import { IoMdCheckboxOutline } from "react-icons/io"

export function ChecklistPreview({ card }) {
  function completedTodos(checklists) {
    let completed = 0
    checklists.forEach((checklist) => {
      completed += checklist.todos.filter((todo) => todo.isDone).length
    })
    return completed
  }

  function totalTodos(checklists) {
    let total = 0
    checklists.forEach((checklist) => {
      total += checklist.todos.length
    })
    return total
  }

  return (
    <div className="card-checklist">
      {totalTodos(card.checklists) > 0 && (
        <span className="todo-checkbox-preview">
          <IoMdCheckboxOutline />
        </span>
      )}
      <span className="todos-preview">
        {totalTodos(card.checklists) > 0 && (
          <span>
            {completedTodos(card.checklists)}/{totalTodos(card.checklists)}
          </span>
        )}
      </span>
    </div>
  )
}
