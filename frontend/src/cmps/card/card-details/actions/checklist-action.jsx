import { useState } from "react"
import { utilService } from "../../../../services/util.service"
import { updateCard } from "../../../../store/actions/board.action"
import { closeActionModal } from "../../../../store/actions/board.action"

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
    closeActionModal()
  }

  return (
    <div className="checklist-action">
      <p>Add checklist</p>
      <div className="sep-line"></div>
      <label htmlFor="title">Title</label>
      <input
        className="new-checklist-input blue-input"
        value={checklistTitle}
        id="title"
        type="text"
        onChange={handleChange}
        
       
        
      />
      <div className="div" onClick={addChecklist}>
        Add
      </div>
    </div>
  )
}
