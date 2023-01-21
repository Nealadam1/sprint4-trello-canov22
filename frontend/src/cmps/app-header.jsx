import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"


export function AppHeader() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const headerBackground = (board) ? utilService.darken(board.style.backgroundColor, -40) : ''

  return <div className="app-header" style={{ backgroundColor: headerBackground }}>
    <div className="logo">
      <Link to="/"><FontAwesomeIcon className='btn-icon' icon={faWeebly}  /><span className="logo-text">orkflow</span></Link></div>
  </div>
}
