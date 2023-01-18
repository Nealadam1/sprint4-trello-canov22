import React from "react"

export function BoardPreview({ board }) {
  return (
    <article className="board-preview" style={{ backgroundColor: board.style.backgroundColor }}>
      <h3>{board.title}</h3>
    </article>

  )


}
