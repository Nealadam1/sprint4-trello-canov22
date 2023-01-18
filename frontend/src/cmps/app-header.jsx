import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"

export function AppHeader() {
  return <div className="app-header"><Link to="/"><FontAwesomeIcon className='btn-icon' icon={faTrello} />Trello</Link></div>
}
