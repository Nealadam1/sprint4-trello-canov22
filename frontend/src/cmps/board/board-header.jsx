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
import { BsSpeedometer2 } from "react-icons/bs"
import { RxDotsHorizontal } from "react-icons/rx"
import { CgLoadbarSound } from "react-icons/cg"
import { CardActivites } from "../card/card-activities"
import { CgClose } from "react-icons/cg"
import { AiOutlineUserAdd } from "react-icons/ai"

export function BoardHeader({ board }) {
  const [boardTitle, setBoardTitle] = useState(board.title)
  const [starred, setIsStarred] = useState(board.isStarred)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
  const buttonRefFilter = useRef(null)
  const buttonRefInvite = useRef(null)

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

  function handleCmpRender(event) { }

  return (
    <div className="board-header">
      <div className="board-actions">
        <div className="align-left">
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
            <button onClick={handleCmpRender}>
              <CgLoadbarSound style={{ fontSize: "20px" }} />
              Board
            </button>
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-dashboard">
            <button onClick={handleCmpRender}>
              <BsSpeedometer2 />
              Dashboard
            </button>
          </div>
        </div>

        <div className="align-right">
          <div className="board-action-filter">
            <button
              className="board-filter-icon"
              ref={buttonRefFilter}
              onClick={
                !isActionModal ? (ev) => OpenActionModal(ev, "board-filter") : null
              }
            >
              <VscListFilter /> Filter
            </button>
            {isActionModal && (
              <DynamicActionModal
                buttonRef={buttonRefFilter.current}
                type={"board-filter"}

              />
            )}
          </div>
          <span className="btn-divider">|</span>
          <div className="board-action-members">
            <BoardMembers />
          </div>
          <button className="board-action-invite"
            ref={buttonRefInvite}
            onClick={
              !isActionModal ? (ev) => OpenActionModal(ev, "board-invite") : null
            }>
            {isActionModal && (
              <DynamicActionModal
                buttonRef={buttonRefInvite.current}
                type={"board-invite"}
                board={board}
              />
            )}
            <AiOutlineUserAdd /> Invite Members</button>
          <span className="btn-divider">|</span>
          <div className="board-action-menu">
            <button
              className="open-menu-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >

              <RxDotsHorizontal />
            </button>
          </div>
        </div>
      </div>
      <div className={isMenuOpen ? "menu show" : "menu"}>
        <span className="close-menu-icon">
          <CgClose onClick={() => setIsMenuOpen(false)} />
        </span>
        <CardActivites />
      </div>
    </div>
  )
}
