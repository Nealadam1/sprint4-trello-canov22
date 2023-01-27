import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { FaUser } from "react-icons/fa"
import { userService } from "../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.action"
import { RiArrowDropDownLine } from "react-icons/ri"
import { BoardSearch } from "./board/board-search"
import { loadBoards, OpenActionModal, setBoard } from "../store/actions/board.action"
import { DynamicActionModal } from "./dynamic-modal-cmp"

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const loggedInUser = userService.getLoggedinUser()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const isActionModal = useSelector((storeState) => storeState.systemModule.isActionModal)
  const buttonRefCreateBoard = useRef(null)
  const buttonRefStarredBoards = useRef(null)
  const buttonRefRecentBoards = useRef(null)
  const headerBackground = board ? utilService.darken(board?.style?.backgroundColor, -40) : ""
  const [isOpenModal, setIsOpenModal] = useState(false)
  const openModalClass = isOpenModal ? 'modal-open' : ''

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }

  return (
    <div className="app-header" style={{ backgroundColor: headerBackground }}>
      <div style={{ display: "flex", alignItems: "center" }}>

        <div className="logo">
          <Link to="/">
            <FontAwesomeIcon className="btn-icon" icon={faWeebly} />
            <span className="logo-text">workflow</span>
          </Link>
        </div>

        <div className={"app-header-links " + openModalClass}>


          <button className="app-header-link" ref={buttonRefRecentBoards}
            onClick={
              !isActionModal ? (ev) => OpenActionModal(ev, "recent-boards") : null
            }>
            Recent
            <span>
              <RiArrowDropDownLine />
            </span>
          </button>
          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefRecentBoards.current}
              type={"recent-boards"}
            />
          )}
          <button className="app-header-link" ref={buttonRefStarredBoards}
            onClick={
              !isActionModal ? (ev) => OpenActionModal(ev, "starred-boards") : null
            }>
            Starred
            <span>
              <RiArrowDropDownLine />
            </span>
          </button>

          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefStarredBoards.current}
              type={"starred-boards"}
            />
          )}

          <button className="app-header-link" ref={buttonRefCreateBoard}
            onClick={
              !isActionModal ? (ev) => OpenActionModal(ev, "create-board2") : null
            }>
            Create board
            <span>
              <RiArrowDropDownLine />
            </span>
          </button>


          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefCreateBoard.current}
              type={"create-board2"}
            />
          )}

        </div>

        <button className="options app-header-link" href="#" onClick={() => setIsOpenModal(!isOpenModal)}>
          More
          <span>
            <RiArrowDropDownLine />
          </span>
        </button>
      </div>
      {loggedInUser ? (
        <div className="user-details">
          <BoardSearch />

          <div className="logged-user" title="Accout">
            <img style={{ width: "30px" }} src={loggedInUser.imgUrl} />
          </div>

          <div className="logout">
            <button onClick={onLogout} className="blue-button">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="login-signup-page">
          <BoardSearch />
          <Link to="/login-signup">
            <FaUser />
          </Link>
        </div>
      )}
    </div>
  )
}
