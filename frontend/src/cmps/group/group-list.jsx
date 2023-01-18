import React from "react"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, onAddGroup }) {
  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <li>
            <GroupPreview cards={group.cards} group={group} />
          </li>
        ))}
      <button onClick={onAddGroup}>Add another list</button>
    </div>
  )
}
