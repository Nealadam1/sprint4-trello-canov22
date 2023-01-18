import React from "react"
import { Link } from "react-router-dom"
import { BoardPreview } from "./board-preview"
import { useState } from "react"
import { CreateBoard } from "./board-create"

export function BoardList({ boards, onStarBoard }) {
  const [isCreateBoard,setIsCreateBoard] = useState(false)
  console.log(boards)
  function onOpenCreateBoard(){
    setIsCreateBoard(true)
  }
  return (
    <ul className="board-list">
      <li onClick={onOpenCreateBoard}>
        {isCreateBoard&&<CreateBoard setIsCreateBoard={setIsCreateBoard}/>}
        <h2>Create New Board</h2>
      </li>
      {boards.map((board) => (
        <li key={board._id}>
          <Link to={`/board/${board._id}`}>
            <BoardPreview board={board} />
          </Link>
          <div>
            <button onClick={() => onStarBoard(board._id)}>StarBoard</button>
          </div>
        </li>
      ))}
    </ul>
  )
}
