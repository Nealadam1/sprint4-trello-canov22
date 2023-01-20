import React from "react"
import { CardLabels } from "./card-details/card-labels";

export function CardPreview({ card }) {
  // console.log(card.labelIds);
  return (
    <div className="card-preview">
      {card?.labelIds ? card.labelIds.map(label => label) : ''}
      <p>{card.title}</p>
    </div>
  )
}
