import { useEffect } from "react"
import { MdOutlineWatchLater } from "react-icons/md"
import { utilService } from "../../../services/util.service"

export function DatePreview({ date }) {
  function isUpcoming(timestamp) {
    const currentTime = new Date().getTime()
    const date = new Date(timestamp).getTime()
    const difference = date - currentTime
    if (difference > 0 && difference < 86400000) {
      return true
    }
    return false
  }

  function isPassed(timestamp) {
    const currentTime = new Date().getTime()
    const date = new Date(timestamp).getTime()
    if (date < currentTime) {
      return true
    }
    return false
  }

  const dateStyle = {
    color: isUpcoming(date) || isPassed(date) ? "white" : "",
    padding: "0.25em",
    borderRadius: "3px",
    backgroundColor: isUpcoming(date)
      ? "#f2d600"
      : isPassed(date)
      ? "#eb5a46"
      : "",
  }

  return (
    <div className="date-preview">
      <span className="date-preview-temp" style={dateStyle}>
        <MdOutlineWatchLater style={{ fontSize: "17px" }} />
        <span style={{ fontSize: "11px" }}>
          {" "}
          {utilService.formatTimestamp(date)}
        </span>
      </span>
    </div>
  )
}
