import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { utilService } from "../../../services/util.service"
import { updateCard } from "../../../store/actions/board.action"
import { IoMdCheckboxOutline } from "react-icons/io"

export function CardChecklists({ checklists, card, setCard }) {
  const [formData, setFormData] = useState({})
  const [todoToInput, setTodoToInput] = useState({})
  const [isHovered, setIsHovered] = useState({})
  const [hoveredTodoId, setHoveredTodoId] = useState(null)

  console.log(isHovered)

  const inputRef = useRef(null)

  useEffect(() => {
    if (todoToInput) {
      inputRef?.current?.focus()
    }
  }, [todoToInput])

  function handleAddTodo(checklistId) {
    const currChecklist = checklists.find(
      (checklist) => checklist.id === checklistId
    )
    currChecklist.todos.push({
      title: formData[checklistId],
      isDone: false,
      id: utilService.makeId(),
    })
    setCard({ ...card, checklists })
    setFormData({ ...formData, [checklistId]: "" })
    setTodoToInput({ ...todoToInput, [checklistId]: false })
    updateCard(card)
  }

  function handleTodoCheck(checklistId, todoId) {
    const currChecklist = checklists.find(
      (checklist) => checklist.id === checklistId
    )
    const currTodo = currChecklist.todos.find((todo) => todo.id === todoId)
    currTodo.isDone = !currTodo.isDone
    setCard({ ...card, checklists })
    updateCard(card)
  }

  function handleFormChange(event, checklistId) {
    const { value } = event.target
    setFormData({ ...formData, [checklistId]: value })
  }

  function handleFormSubmit(event, checklistId) {
    event.preventDefault()
    handleAddTodo(checklistId)
  }

  function completedPercentage(checklist) {
    if (!checklist?.todos) return 0
    const completed = checklist?.todos?.filter((todo) => todo.isDone).length
    const prec = Math.floor((completed / checklist?.todos?.length) * 100)
    return prec
  }

  function onDeleteChecklist(checklistId) {
    const newChecklists = checklists.filter(
      (checklist) => checklist.id !== checklistId
    )
    setCard({ ...card, checklists: newChecklists })
    updateCard({ ...card, checklists: newChecklists })
  }

  function handleBlur(checklistId) {
    if (!formData[checklistId]) {
      setTodoToInput({ ...todoToInput, [checklistId]: false })
    }
  }

  function handleDeleteTodo(todoId) {
    checklists.forEach((checklist) => {
      checklist.todos = checklist.todos.filter((todo) => todo.id !== todoId)
    })
    setCard({ ...card, checklists })
    updateCard(card)
  }

  return (
    <div className="card-checklists">
      {checklists.map((checklist) => (
        <ul className="checklist" key={checklist.id}>
          <div className="checklist-title">
            <h3>
              <IoMdCheckboxOutline /> {checklist.title}
            </h3>
            <button
              className="grey-button delete-checklist-btn"
              onClick={() => onDeleteChecklist(checklist.id)}
            >
              Delete
            </button>
          </div>
          <div className="container-prec">
            <span> {completedPercentage(checklist) || 0}%</span>
            <div className="progress-bar-container">
              <div
                style={{
                  width: `${completedPercentage(checklist)}%`,
                  background:
                    `${completedPercentage(checklist)}` !== "100"
                      ? "#5ba4cf"
                      : "green",
                }}
                className="progress-bar"
              ></div>
            </div>
          </div>
          {checklist?.todos?.map((todo) => (
            <li className="checklist-todo" key={todo.id}>
              <div
                key={todo.id}
                onMouseEnter={() => setHoveredTodoId(todo.id)}
                onMouseLeave={() => setHoveredTodoId(null)}
                className="todo-container"
              >
                <div className="todo-display">
                  <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    checked={todo.isDone}
                    onChange={() => handleTodoCheck(checklist.id, todo.id)}
                  />
                  <label
                    className={
                      todo.isDone
                        ? "todo-label done-todo"
                        : "todo-label active-todo"
                    }
                    htmlFor={`todo-${todo.id}`}
                  >
                    {todo.title}
                  </label>
                </div>
                <div className="todo-action">
                  {hoveredTodoId === todo.id && (
                    <button
                      className="grey-button delete-todo-btn"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
          {todoToInput[checklist.id] ? (
            <form onSubmit={(event) => handleFormSubmit(event, checklist.id)}>
              <input
                className="todo-input blue-input"
                ref={inputRef}
                onBlur={() => handleBlur(checklist.id)}
                type="text"
                value={formData[checklist.id]}
                onChange={(event) => handleFormChange(event, checklist.id)}
              />
              <div className="todo-btns flex">
                <button className="blue-button" type="submit">
                  Add Todo
                </button>
                <button className="grey-button">Cancel</button>
              </div>
            </form>
          ) : (
            <button
              className="add-checklist-todo-btn"
              onClick={() =>
                setTodoToInput({ ...todoToInput, [checklist.id]: true })
              }
            >
              Add an item
            </button>
          )}
        </ul>
      ))}
    </div>
  )
}
