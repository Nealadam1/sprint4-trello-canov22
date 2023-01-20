import { useState } from "react"

export function ChecklistAction({ card }) {
  const [checklistTitle, setChecklistTitle] = useState("")

  function handleChange({ target }) {
    const { value } = target
    setChecklistTitle(value)
  }

  function addChecklist() {
    console.log("hi")
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
