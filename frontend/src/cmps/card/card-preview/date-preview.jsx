import { MdOutlineWatchLater } from "react-icons/md"
import { utilService } from "../../../services/util.service"

export function DatePreview({ date }) {
  return (
    <span className="date-preview">
      <MdOutlineWatchLater /> {utilService.formatTimestamp(date)}
    </span>
  )
}
