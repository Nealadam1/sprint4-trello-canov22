import React from "react"
import { Link } from "react-router-dom"
import { BoardPreview } from "./board-preview"
import { useState } from "react"
import { CreateBoard } from "./board-create"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"

export function BoardList({ boards, onStarBoard }) {
  const [isCreateBoard, setIsCreateBoard] = useState(false)
  console.log(boards)
  function onOpenCreateBoard() {
    setIsCreateBoard(true)
  }

  function starBoard(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()

    onStarBoard(board._id)
  }

  return (
    <ul className="board-list">
      <li onClick={onOpenCreateBoard}>
        {isCreateBoard && <CreateBoard setIsCreateBoard={setIsCreateBoard} />}
        <p>Create new board</p>
      </li>
      {boards.map((board) => (
        <Link to={`/board/${board._id}`} key={board._id}>
          <li>
            <BoardPreview board={board} />
            {/* <div> */}
            <button onClick={(ev) => starBoard(ev, board)}>
              <FontAwesomeIcon className="btn-icon" icon={faStar} />
            </button>
            {/* </div> */}
          </li>
        </Link>
      ))}
    </ul>
  )
}
