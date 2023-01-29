import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faStar as faFullStar,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { HiOutlineStar } from "react-icons/hi"

import { BoardPreview } from "./board-preview"
import { DynamicActionModal } from "../dynamic-modal-cmp"
import {
  OpenActionModal,
  setBoard,
  updateBoard,
} from "../../store/actions/board.action"
import { boardService } from "../../services/board.service"
import { BsArchive } from "react-icons/bs"
import LoadingSpinner from "../../views/spinner/loading-spinner"
import { HiOutlineUser } from "react-icons/hi"

export function BoardList({ boards }) {
  const [isOpen, setIsOpen] = useState(false)

  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const [changedBoard, setChangedBoard] = useState(boardService.getEmptyBoard())
  const dynmOpenModal = !isActionModal
    ? (ev) => OpenActionModal(ev, "create-board")
    : null
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

  function onArchiveBoard(ev, board) {
    ev.preventDefault()
    ev.stopPropagation()
    board.archivedAt = Date.now()
    board.isStarred = false
    updateBoard(board)
    setBoard(board)
  }

  function getStarredBoard() {
    let favoriteBoards = []
    boards.map((board) => {
      if (board.isStarred) favoriteBoards.push(board)
    })
    return favoriteBoards
  }

  function getBoards() {
    return boards.filter((board) => board.archivedAt === "")
  }

  if (!boards) return <LoadingSpinner />

  return (
    <ul className="board-list">
      <ul className="favorite-list">
        {getStarredBoard().length ? (
          <h3>
            <span>
              <HiOutlineStar
                style={{ fontSize: "22px", marginLeft: "0.5rem" }}
              />
              Starred boards
            </span>
          </h3>
        ) : (
          ""
        )}
        {getStarredBoard().map((board) => {
          return (
            <li
              className="list-item"
              style={{
                background: `${
                  board.style.thumbnail
                    ? `url(${board.style.thumbnail})`
                    : `${board.style.backgroundColor}`
                }`,
              }}
              key={board._id}
            >
              <Link to={`/board/${board._id}`}>
                <BoardPreview board={board} />
                <button onClick={(ev) => onArchiveBoard(ev, board)}>
                  {/* {<BsArchive />} */}
                </button>
                <button onClick={(ev) => starBoard(ev, board)}>
                  <FontAwesomeIcon
                    style={{
                      marginRight: "1rem",
                      marginBottom: "0.5rem",
                      fontSize: "12px",
                      color: board.isStarred ? "gold" : "inherit",
                    }}
                    className="btn-star-icon"
                    icon={board.isStarred ? faFullStar : faStar}
                  />
                </button>
              </Link>
            </li>
          )
        })}
      </ul>
      <h3 className="your-boards">
        <span>
          <HiOutlineUser style={{ fontSize: "22px", marginLeft: "0.5rem" }} />
          Your boards
        </span>
      </h3>
      <li
        className="list-item grey-button"
        ref={buttonRef}
        onClick={dynmOpenModal}
      >
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
      {getBoards().map((board) => {
        return (
          <li
            className="list-item"
            style={{
              background: `${
                board?.style?.thumbnail
                  ? `url(${board?.style?.thumbnail})`
                  : `${board?.style?.backgroundColor}`
              }`,
            }}
            key={board._id}
          >
            <Link to={`/board/${board._id}`}>
              <BoardPreview board={board} />

              <button onClick={(ev) => onArchiveBoard(ev, board)}>
                {/* {<BsArchive />} */}
              </button>
              <button onClick={(ev) => starBoard(ev, board)}>
                <FontAwesomeIcon
                  style={{
                    marginRight: "1rem",
                    marginBottom: "0.5rem",
                    fontSize: "12px",
                    color: board.isStarred ? "gold" : "inherit",
                  }}
                  className="btn-icon"
                  icon={board.isStarred ? faFullStar : faStar}
                />
              </button>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
