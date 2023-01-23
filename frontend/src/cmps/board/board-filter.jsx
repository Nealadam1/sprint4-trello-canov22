import React from "react"
import { filterCardsBy } from "../../store/actions/board.action"

export function BoardFilter({ onSetFilter }) {
  // const [filterByToEdit, setFilterByToEdit] = useState()

  function handleChange({ target }) {
    const { value } = target
    filterCardsBy(value)
  }

  return (
    <div className="board-filter">
      <p>Filter</p>
      <label htmlFor="board-input-filter">Keyword</label>
      <input
        placeholder="Enter a keyword..."
        type="text"
        className="blue-input"
        onChange={handleChange}
        name="board-input-filter"
        id="board-input-filter"
      />
    </div>
  )
}
