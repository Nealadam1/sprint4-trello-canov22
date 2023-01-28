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
    <div
      style={{
        backgroundColor:
          completedTodos(card.checklists) === totalTodos(card.checklists)
            ? "#61bd4f"
            : "inherit",
        borderRadius: "3px",
        height: "24px",
      }}
      className="card-checklist"
    >
      {totalTodos(card.checklists) > 0 && (
        <span
          style={{
            color:
              completedTodos(card.checklists) === totalTodos(card.checklists)
                ? "white"
                : "inherit",
          }}
          className="todo-checkbox-preview"
        >
          <IoMdCheckboxOutline />
        </span>
      )}
      <span
        style={{
          color:
            completedTodos(card.checklists) === totalTodos(card.checklists)
              ? "white"
              : "inherit",
        }}
        className="todos-preview"
      >
        {totalTodos(card.checklists) > 0 && (
          <span>
            {completedTodos(card.checklists)}/{totalTodos(card.checklists)}
          </span>
        )}
      </span>
    </div>
  )
}
