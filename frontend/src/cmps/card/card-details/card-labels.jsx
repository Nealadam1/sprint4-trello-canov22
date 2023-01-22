import { useSelector } from "react-redux"
import { utilService } from "../../../services/util.service"

export function CardLabels({ cardLabels }) {
  const displayLabels = []

  const labels = useSelector((storeState) => storeState.labelModule.labels)

  return (
    <div className="card-labels">
      {cardLabels?.map((label) => {
        labels.map((displayLabel) => {
          if (label === displayLabel.id) displayLabels.push(displayLabel)
        })
      })}
      {displayLabels.map((label) => (
        <span
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
