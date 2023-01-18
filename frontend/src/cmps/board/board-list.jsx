import React from "react"
import { BoardPreview } from "./board-preview"

export function BoardList(board, onStarBoard) {
  return (
    <ul className="board-list">
      {board.map(board =>
        <li key={board._id}>
          <LInk to={`/board/${board._id}`}>
            <BoardPreview board={board} />
          </LInk>
          <div>
            <button onClick={()=>onStarBoard(board._id)}>StarBoard</button>
          </div>
        </li>)}

    </ul>
  )
}
