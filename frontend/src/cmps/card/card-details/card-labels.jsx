import { useSelector } from "react-redux"

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
        <span key={label.id} style={{ background: label.color }}>{label.title}</span>
      ))}
    </div>
  )
}
