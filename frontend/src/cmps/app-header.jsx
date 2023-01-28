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
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri"
import { BoardSearch } from "./board/board-search"
import {
  loadBoards,
  OpenActionModal,
  setBoard,
} from "../store/actions/board.action"
import { DynamicActionModal } from "./dynamic-modal-cmp"
import { BiSearch } from "react-icons/bi"

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const loggedInUser = userService.getLoggedinUser()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const buttonRefCreateBoard = useRef(null)
  const buttonRefStarredBoards = useRef(null)
  const buttonRefRecentBoards = useRef(null)
  const headerBackground = board
    ? utilService.darken(board?.style?.backgroundColor, -40)
    : ""
  const [isOpenModal, setIsOpenModal] = useState(false)
  const openModalClass = isOpenModal ? "modal-open" : ""
  const [openUserModal, setOpenUserModal] = useState(false)
  const userModalClass = openUserModal ? 'open-user' : ''
  const [openSearch, setOpenSearch] = useState(false)
  const searchClass = openSearch ? 'open-search' : ''

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
            <span className="logo-text">orkflow</span>
          </Link>
        </div>

        <div className={"app-header-links " + openModalClass}>
          <button
            className="app-header-link"
            ref={buttonRefRecentBoards}
            onClick={
              !isActionModal
                ? (ev) => OpenActionModal(ev, "recent-boards")
                : null
            }
          >
            Recent
            <span>
              {openModalClass ? (
                <RiArrowDropRightLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </span>
          </button>
          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefRecentBoards.current}
              type={"recent-boards"}
            />
          )}
          <button
            className="app-header-link"
            ref={buttonRefStarredBoards}
            onClick={
              !isActionModal
                ? (ev) => OpenActionModal(ev, "starred-boards")
                : null
            }
          >
            Starred
            <span>
              {openModalClass ? (
                <RiArrowDropRightLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </span>
          </button>

          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefStarredBoards.current}
              type={"starred-boards"}
            />
          )}

          <button
            className="app-header-link"
            ref={buttonRefCreateBoard}
            onClick={!isActionModal ? (ev) => OpenActionModal(ev, "create-board2") : null}>
            Create board
            <span>
              {openModalClass ? (<RiArrowDropRightLine />) : (<RiArrowDropDownLine />)}
            </span>
          </button>

          {isActionModal && (
            <DynamicActionModal
              buttonRef={buttonRefCreateBoard.current}
              type={"create-board2"}
            />
          )}
        </div>

        <button
          className="options app-header-link"
          href="#"
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          More
          <span style={{ display: "flex" }}>
            <RiArrowDropDownLine />
          </span>
        </button>
      </div>
      {loggedInUser ? (
        <div className="user-details">

          <div className="search-modal" style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', cursor: 'pointer' }} onClick={() => setOpenSearch(!openSearch)}>
            <BiSearch style={{ width: '22px', height: '22px' }} className='svg-icn' />
          </div>

          <BoardSearch searchClass={searchClass} />

          <div className={"logged-user " + userModalClass} title="Accout" onClick={() => setOpenUserModal(!openUserModal)}>
            <img style={{ width: "30px" }} src={loggedInUser.imgUrl} />
          </div>

          {userModalClass && <div className="logout">
            <button onClick={onLogout} className="blue-button">
              Logout
            </button>
          </div>}

        </div>
      ) : (
        <div className="login-signup-page">
          <BoardSearch />
          <Link to="/login">
            <FaUser />
          </Link>
        </div>
      )}
    </div>
  )
}
