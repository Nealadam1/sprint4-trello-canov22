import React from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({
  group,
  cards,
  updateGroupTitle,
  setGroupTitleToInput,
  groupTitleToInput,
}) {
  return (
    <div className="group-preview">
      {groupTitleToInput ? (
        <input />
      ) : (
        <h4 onClick={() => setGroupTitleToInput(true)}>{group.title}</h4>
      )}
      <CardList cards={cards} group={group} />
    </div>
  )
}
