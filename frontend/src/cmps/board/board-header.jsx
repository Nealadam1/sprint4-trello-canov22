import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import {
  OpenActionModal,
  setBoard,
  updateBoard,
} from "../../store/actions/board.action"
import { faStar as faFullStar } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { BoardMembers } from "../members/board-members"
import { DynamicActionModal } from "../dynamic-modal-cmp"
import { useSelector } from "react-redux"
import { VscListFilter } from "react-icons/vsc"

export function BoardHeader({ board }) {
  const [boardTitle, setBoardTitle] = useState(board.title)
  const [starred, setIsStarred] = useState(board.isStarred)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )

  useEffect(() => {
    if (isEditingTitle) {
      inputRef?.current?.focus()
    }
  }, [isEditingTitle])

  const inputRef = useRef(null)
  const boardTitleRef = useRef(null)

  const dynmOpenModal = !isActionModal
    ? (ev) => OpenActionModal(ev, "board-filter")
    : null
  const buttonRef = useRef(null)

  function handleTitleChange({ target }) {
    setBoardTitle(target.value)
  }

  function handleTitleSave() {
    board.title = boardTitle
    updateBoard(board)
    setBoard(board)
    setIsEditingTitle(false)
  }

  function handleIsStarred() {
    board.isStarred = !board.isStarred
    setIsStarred(board.isStarred)
    updateBoard(board)
  }

  function handleBlur(ev) {
    if (!ev.target.value) {
      ev.preventDefault()
      return
    } else {
      handleTitleSave()
    }
  }
  const inputWidth = isEditingTitle
    ? boardTitleRef?.current?.getBoundingClientRect().width
    : 0
  const maxWidth = inputWidth > 0 ? inputWidth * 0.8 : 0

  function handleCmpRender(event) {}

  return (
    <div className="board-header">
      {isEditingTitle ? (
        <>
          <input
            ref={inputRef}
            style={{ width: inputWidth }}
            type="text"
            className="board-title-input blue-input"
            value={boardTitle}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            required
          />
        </>
      ) : (
        <div
          ref={boardTitleRef}
          className="board-title"
          onClick={() => setIsEditingTitle(true)}
        >
          {boardTitle}
        </div>
      )}
      <div className="board-actions">
        <div className="align-left">
          <div className="board-action-star">
            <button onClick={handleIsStarred}>
              <FontAwesomeIcon
                className="btn-icon"
                icon={board.isStarred ? faFullStar : faStar}
              />
            </button>
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-board">
            <button onClick={handleCmpRender}>Board</button>
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-dashboard">
            <button onClick={handleCmpRender}>Dashboard</button>
          </div>
        </div>

        <div className="align-right">
          <div className="board-action-filter">
            <button
              className="board-filter-icon"
              ref={buttonRef}
              onClick={dynmOpenModal}
            >
              <VscListFilter /> Filter
              {isActionModal && (
                <DynamicActionModal
                  buttonRef={buttonRef.current}
                  type={"board-filter"}
                />
              )}
            </button>
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-members">
            <BoardMembers />
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-menu">
            <button onClick={handleCmpRender}>Menu</button>
          </div>
        </div>
      </div>
    </div>
  )
}
