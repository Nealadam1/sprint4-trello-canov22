import React from "react"
import { Link } from "react-router-dom"
import { BoardPreview } from "./board-preview"
import { useState } from "react"
import { CreateBoard } from "./board-create"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { DynamicActionModal } from "../dynamic-modal-cmp"
import { useSelector } from "react-redux"
import { OpenActionModal } from "../../store/actions/board.action"

export function BoardList({ boards, onStarBoard }) {
  const isActionModal= useSelector(storeState=> storeState.boardModule.isActionModal)
  console.log(boards)

  function starBoard(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()

    onStarBoard(board._id)
  }

  return (
    <ul className="board-list">
      <li onClick={OpenActionModal}>
        {isActionModal && <DynamicActionModal />}
        <p>Create new board</p>
      </li>
      {boards.map((board) => {
        console.log(board.style);
        return <li style={board.style}>
          <Link to={`/board/${board._id}`} key={board._id}>

            <BoardPreview board={board} />

            <button onClick={(ev) => starBoard(ev, board)}>
              <FontAwesomeIcon className="btn-icon" icon={faStar} />
            </button>

          </Link>
        </li>

      })}
    </ul>
  )
}
