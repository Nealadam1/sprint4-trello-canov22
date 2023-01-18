import React from "react"
import { CardList } from "../card/card-list"

export function GroupPreview({ group, cards }) {
  return (
    <div className="group-preview">
      <h4>{group.title}</h4>
      <CardList cards={cards} />
    </div>
  )
}
