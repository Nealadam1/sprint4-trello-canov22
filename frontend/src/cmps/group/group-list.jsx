import React from "react"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, onAddGroup, onDeleteGroup }) {
  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <li className="group" key={group.id}>
            <GroupPreview cards={group.cards} group={group} groups={groups} />
            <button
              className="delete-group-btn"
              onClick={() => onDeleteGroup(group.id)}
            >
              X
            </button>
          </li>
        ))}
      <button onClick={onAddGroup}>Add another list</button>
    </div>
  )
}
