import { useSelector } from "react-redux"
import { utilService } from "../../../services/util.service"

export function CardLabels({ CardLabels }) {
  const displayLabels = []

  const labels = useSelector((storeState) => storeState.labelModule.labels)

  return (
    <div className="card-labels">
      {CardLabels?.map((label) => {
        labels.map((displayLabel) => {
          if (label === displayLabel.id) displayLabels.push(displayLabel)
        })
      })}

      {displayLabels.map((label) => (
        <div className="card-label" key={label.id} style={{ background: label.color }}>
          <div className="circle" style={{ background: utilService.changeContrast(label.color) }}></div>{label.title}
        </div>
      ))}
    </div>
  )
}
