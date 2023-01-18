import React from "react"
import { Link, useParams } from "react-router-dom"

export function CardPreview({ card }) {
  const { boardId } = useParams()

  return (
    <Link to={`/board/${boardId}/${card.id}`} className="card-preview">
      {card.title}
    </Link>
  )
}
