import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faFullStar, faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"

import { BoardPreview } from "./board-preview"
import { useState } from "react"
import { CreateBoard } from "./board-create"
import { DynamicActionModal } from "../dynamic-modal-cmp"
import { OpenActionModal } from "../../store/actions/board.action"
import { boardService } from "../../services/board.service"

export function BoardList({ boards }) {
  const isActionModal = useSelector(storeState => storeState.boardModule.isActionModal)

  function starBoard(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()
    board.isStarred = !board.isStarred
    boardService.save(board)
  }

  return (
    <ul className="board-list">
      <li onClick={OpenActionModal}>
        {isActionModal && <DynamicActionModal />}
        <div>
          <p>Create new board</p>
        </div>
      </li>
      {boards.map((board) => {
        // console.log(board.style);
        return <li style={board.style} key={board._id}>
          <Link to={`/board/${board._id}`}>

            <BoardPreview board={board} />

            <button>
              <FontAwesomeIcon className="btn-icon" icon={faEllipsis} />
            </button>

            <button onClick={(ev) => starBoard(ev, board)}>
              <FontAwesomeIcon className="btn-icon" icon={board.isStarred ? faFullStar : faStar} />
            </button>

          </Link>
        </li>

      })}
    </ul>
  )
}
