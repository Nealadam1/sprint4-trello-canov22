import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStar as faFullStar,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"

import { BoardPreview } from "./board-preview"
import { DynamicActionModal } from "../dynamic-modal-cmp"
import { OpenActionModal } from "../../store/actions/board.action"
import { boardService } from "../../services/board.service"
import { BoardFavorites } from "./board-favorites"

export function BoardList({ boards }) {
  const isActionModal = useSelector((storeState) => storeState.systemModule.isActionModal)
  const [changedBoard, setChangedBoard] = useState(boardService.getEmptyBoard())
  const dynmOpenModal = !isActionModal ? OpenActionModal : null
  const buttonRef = useRef(null)

  useEffect(() => {
    getStarredBoard()
  }, [changedBoard.isStarred])

  function starBoard(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()
    setChangedBoard((prevBoard) => ({ ...board }))
    board.isStarred = !board.isStarred
    boardService.save(board)
  }

  function onOpenSettings(ev, board) {
    ev.stopPropagation()
    ev.preventDefault()

    console.log(board)
  }

  function getStarredBoard() {
    let favoriteBoards = []
    boards.map((board) => {
      if (board.isStarred) favoriteBoards.push(board)
    })
    return favoriteBoards
  }

  if (!boards) return <h2>Loading....</h2>

  return (
    <ul className="board-list">
      <ul className="favorite-list">
        {/* <h2>Favorite</h2> */}
        {getStarredBoard().map((board) => {
          return (
            <li
              className="list-item"
              style={{
                background: `${board.style.thumbnail
                  ? `url(${board.style.thumbnail})`
                  : `${board.style.backgroundColor}`
                  }`,
              }}
              key={board._id}
            >
              <Link to={`/board/${board._id}`}>
                <BoardPreview board={board} />

                <button onClick={(ev) => onOpenSettings(ev, board)}>
                  <FontAwesomeIcon className="btn-icon" icon={faEllipsis} />
                </button>

                <button onClick={(ev) => starBoard(ev, board)}>
                  <FontAwesomeIcon
                    className="btn-icon"
                    icon={board.isStarred ? faFullStar : faStar}
                  />
                </button>
                x
              </Link>
            </li>
          )
        })}
      </ul>

      {boards.map((board) => {
        // console.log(board.style);
        return (
          <li
            className="list-item"
            style={{
              background: `${board.style.thumbnail
                ? `url(${board.style.thumbnail})`
                : `${board.style.backgroundColor}`
                }`,
            }}
            key={board._id}
          >
            <Link to={`/board/${board._id}`}>
              <BoardPreview board={board} />

              <button onClick={(ev) => onOpenSettings(ev, board)}>
                <FontAwesomeIcon className="btn-icon" icon={faEllipsis} />
              </button>

              <button onClick={(ev) => starBoard(ev, board)}>
                <FontAwesomeIcon
                  className="btn-icon"
                  icon={board.isStarred ? faFullStar : faStar}
                />
              </button>
            </Link>
          </li>
        )
      })}

      <li className="list-item" ref={buttonRef} onClick={dynmOpenModal}>
        {isActionModal && (
          <DynamicActionModal
            buttonRef={buttonRef.current}
            type={"create-board"}
          />
        )}
        <div>
          <p>Create new board</p>
        </div>
      </li>
    </ul>
  )
}
