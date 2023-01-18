import React, { useState } from "react"
import { useSelector } from "react-redux"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, onAddGroup, onDeleteGroup, board }) {
  const [showInput, setShowInput] = useState(false)

  function updateGroupTitle(group) {
    const newTitle = prompt("Pick new title")
    const updatedGroup = { ...group, title: newTitle }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...board, groups: updatedGroups })
    updateBoard({ ...board, groups: updatedGroups })
  }

  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <li className="group" key={group.id}>
            <GroupPreview
              updateGroupTitle={updateGroupTitle}
              cards={group.cards}
              group={group}
              groups={groups}
            />
            <button
              className="delete-group-btn"
              onClick={() => onDeleteGroup(group.id)}
            >
              X
            </button>
          </li>
        ))}
      <button className="add-group-btn" onClick={onAddGroup}>
        + Add another list
      </button>
    </div>
  )
}
