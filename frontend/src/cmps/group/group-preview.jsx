import React, { useState, useRef } from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({ group, cards, updateGroupTitle }) {
  const [groupTitleToInput, setGroupTitleToInput] = useState({})
  const [newTitle, setNewTitle] = useState(group.title)
  const inputRef = useRef(null)

  const handleBlur = (event) => {
    updateGroupTitle(group.id, event.target.value)
    setGroupTitleToInput({ ...groupTitleToInput, [group.id]: false })
  }

  return (
    <div className="group-preview">
      {groupTitleToInput[group.id] ? (
        <form>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </form>
      ) : (
        <h4
          onClick={() => {
            setGroupTitleToInput({ ...groupTitleToInput, [group.id]: true })
            inputRef.current.focus()
          }}
        >
          {newTitle}
        </h4>
      )}
      <CardList cards={cards} group={group} />
    </div>
  )
}
