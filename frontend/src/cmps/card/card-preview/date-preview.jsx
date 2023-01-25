import { useEffect } from "react"
import { MdOutlineWatchLater } from "react-icons/md"
import { utilService } from "../../../services/util.service"

export function DatePreview({ date }) {
  return (
    <div className="date-preview">
      <span className="date-preview-temp">
        <MdOutlineWatchLater style={{ fontSize: "17px" }} />
        <span> {utilService.formatTimestamp(date)}</span>
      </span>
    </div>
  )
}
