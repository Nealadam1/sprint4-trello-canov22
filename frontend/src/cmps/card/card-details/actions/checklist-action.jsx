import { useState } from "react"

export function ChecklistAction({ card }) {
  const [checklistTitle, setChecklistTitle] = useState("")

  function handleChange({ target }) {
    const { value } = target
    setChecklistTitle(value)
  }

  function addChecklist(ev) {
    ev.preventDefault()
    console.log(checklistTitle)
  }

  return (
    <div className="label-action">
      <p>Add checklist</p>
      <form onSubmit={addChecklist}>
        <label htmlFor="title">Title</label>
        <input
          value={checklistTitle}
          id="title"
          type="text"
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  )
}
