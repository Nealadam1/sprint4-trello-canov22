import { useEffect, useState } from "react"
import { useRef } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { useSelector } from "react-redux"
import { utilService } from "../../../services/util.service"
import { OpenActionModal } from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"

export function CardLabels({ card, cardLabelIds }) {
  const [isHovered, setIsHovered] = useState(false)
  const displayLabels = []
  const board = useSelector((storeState) => storeState.boardModule.board)
  let labels = board.labels
  return (
    <div className="card-labels">
      {cardLabelIds?.map((labelId) => {
        labels.forEach((label) => {
          if (labelId === label.id) displayLabels.push(label)
        })
      })}
      {displayLabels.map((label) => (
        <span
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="card-label"
          key={label.id}
          style={{
            background: utilService.lightenColor(label.color),
          }}
        >
          <div className="circle" style={{ background: label.color }}></div>
          {label.title}
        </span>
      ))}
    </div>
  )
}
