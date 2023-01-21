import React, { useState } from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({ group, cards }) {
  const [groupTitleToInput, setGroupTitleToInput] = useState({})

  return (
    <div className="group-preview">
      {groupTitleToInput[group.id] ? (
        <form>
          <input type="text" />
        </form>
      ) : (
        <h4
          onClick={() =>
            setGroupTitleToInput({ ...groupTitleToInput, [group.id]: true })
          }
        >
          {group.title}
        </h4>
      )}
      <CardList cards={cards} group={group} />
    </div>
  )
}
