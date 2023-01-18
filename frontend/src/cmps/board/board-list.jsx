import React from "react"
import { BoardPreview } from "./board-preview"
import { Link } from "react-router-dom"

export function BoardList({boards, onStarBoard}) {
  console.log(boards)
  return (
    <ul className="board-list">
      {boards.map(board =>
        <li key={board._id}>
          <Link to={`/board/${board._id}`}>
            <BoardPreview board={board} />
          </Link>
          <div>
            <button onClick={()=>onStarBoard(board._id)}>StarBoard</button>
          </div>
        </li>)}

    </ul>
  )
}
