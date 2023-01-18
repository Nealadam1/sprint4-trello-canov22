import React from "react"
import { Link } from "react-router-dom"
import { BoardPreview } from "./board-preview"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"

export function BoardList({ boards, onStarBoard }) {
  console.log(boards)

  function starBoard(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()

    onStarBoard(board._id)
  }

  return (
    <ul className="board-list">
      {boards.map((board) => (
        <Link to={`/board/${board._id}`}>
          <li key={board._id}>
            <BoardPreview board={board} />
            {/* <div> */}
            <button onClick={(ev) => starBoard(ev, board)}><FontAwesomeIcon className='btn-icon' icon={faStar} /></button>
            {/* </div> */}
          </li>
        </Link>
      ))}
    </ul>
  )
}
