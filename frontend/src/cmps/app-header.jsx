import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { FaUser } from "react-icons/fa"
import { userService } from "../services/user.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.action"

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)

  const loggedInUser = userService.getLoggedinUser()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const headerBackground = board
    ? utilService.darken(board.style.backgroundColor, -40)
    : ""

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
      <div className="logo">
        <Link to="/">
          <FontAwesomeIcon className="btn-icon" icon={faWeebly} />
          <span className="logo-text">orkflow</span>
        </Link>
      </div>
      {loggedInUser ? (
        <div className="user-details">
          <div className="logged-user">
            <span>{loggedInUser.fullname}</span>
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
          <Link to="/login-signup">
            <FaUser />
          </Link>
        </div>
      )}
    </div>
  )
}
