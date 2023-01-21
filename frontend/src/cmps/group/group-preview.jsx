import React, { useState, useRef, useEffect } from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({ group, cards, updateGroupTitle }) {
  const [groupTitleToInput, setGroupTitleToInput] = useState({})
  const [newTitle, setNewTitle] = useState(group.title)
  const inputRef = useRef(null)

  const handleBlur = (event) => {
    updateGroupTitle(group, event.target.value)
    setGroupTitleToInput({ ...groupTitleToInput, [group.id]: false })
  }

  useEffect(() => {
    if (groupTitleToInput[group.id]) {
      inputRef.current.focus()
    }
  }, [groupTitleToInput, group.id])

  return (
    <div className="group-preview">
      {groupTitleToInput[group.id] ? (
        <form>
          <input
            className="group-title-input blue-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </form>
      ) : (
        <h4
          onClick={() =>
            setGroupTitleToInput({ ...groupTitleToInput, [group.id]: true })
          }
        >
          {newTitle}
        </h4>
      )}
      <CardList cards={cards} group={group} />
    </div>
  )
}
