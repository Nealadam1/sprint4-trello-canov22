import { useState } from "react"
import { utilService } from "../../../../services/util.service"
import { updateCard } from "../../../../store/actions/board.action"

export function ChecklistAction({ card, setCard }) {
  const [checklistTitle, setChecklistTitle] = useState("")

  function handleChange({ target }) {
    const { value } = target
    setChecklistTitle(value)
  }

  function addChecklist() {
    const newChecklist = {
      id: utilService.makeId(),
      title: checklistTitle,
      todos: [],
    }
    const updatedChecklist = [...card.checklists, newChecklist]
    const updatedCard = { ...card, checklists: updatedChecklist }
    updateCard(updatedCard)
    setCard(updatedCard)
  }

  return (
    <div className="label-action">
      <p>Add checklist</p>
      <label htmlFor="title">Title</label>
      <input
        value={checklistTitle}
        id="title"
        type="text"
        onChange={handleChange}
      />
      <button className="button" onClick={addChecklist}>
        Add
      </button>
    </div>
  )
}
