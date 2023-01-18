import React from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({ group, cards, groups, updateGroupTitle }) {
  return (
    <div className="group-preview">
      <h4 onClick={() => updateGroupTitle(group)}>{group.title}</h4>
      <CardList cards={cards} group={group} groups={groups} />
    </div>
  )
}
