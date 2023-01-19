import React from "react"

export function BoardPreview({ board }) {

  return (
    <article className="board-preview">
      <p>{board.title}</p>
    </article>
  )
}
