import React from "react"

export function CardPreview({ card }) {
  console.log(card)

  return <div className="card-preview">{card.title}</div>
}
