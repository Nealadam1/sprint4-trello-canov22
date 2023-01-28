import React from "react"
import { utilService } from "../../../services/util.service"

export function CardDate({ date }) {
  return (
    <div className="card-date-details">
      <span className="card-date-title">Due date</span>
      <div className="card-date">{utilService.formatTimestamp(date)}</div>
    </div>
  )
}
