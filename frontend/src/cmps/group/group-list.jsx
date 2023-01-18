import React from "react"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups, onAddList }) {
  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <li>
            <GroupPreview cards={group.cards} group={group} />
          </li>
        ))}
      <button onClick={onAddList}>Add another list</button>
    </div>
  )
}
