import React from "react"
import { GroupPreview } from "./group-preview"

export function GroupList({ groups }) {
  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <li>
            <GroupPreview cards={group.cards} group={group} />
          </li>
        ))}
    </div>
  )
}
