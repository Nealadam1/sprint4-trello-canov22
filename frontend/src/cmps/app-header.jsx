import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"


export function AppHeader() {
  const board=useSelector((storeState)=> storeState.boardModule.board)
  console.log(board)
  const headerBackground=(board)? utilService.darken(board.style.backgroundColor, -40) : ''
  console.log(headerBackground)
  
  return <div className="app-header" style={{backgroundColor:headerBackground }}>
    <Link to="/"><FontAwesomeIcon className='btn-icon' icon={faTrello} style={{backgroundColor: board?.style.backgroundColor}}/>Trello</Link></div>
}
