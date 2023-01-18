import React from "react"
import { CardPreview } from "./card-preview"

export function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards &&
        cards.map((card) => (
          <li>
            <CardPreview card={card} />
          </li>
        ))}
    </div>
  )
}
