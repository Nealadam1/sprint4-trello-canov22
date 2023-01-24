import React from "react"
import { utilService } from "../../../services/util.service"

export function CardDate({ date }) {
  return <div className="card-date">{utilService.formatTimestamp(date)}</div>
}
