import { useState } from "react"
import { setLabelState } from "../../../store/actions/board.action"
import { CardLabels } from "../card-details/card-labels"
export function LabelPreview({ labels }) {
  const [openLabel, setOpenLabel] = useState(true)
  // console.log(labels);

  function onClickLabels(ev) {
    ev.preventDefault()
    ev.stopPropagation()
    setOpenLabel(!openLabel)
    setLabelState(openLabel)
  }

  // labels.map(label => label)
  if (!labels?.length) return
  return (
    <div>
      <div key={labels} onClick={onClickLabels}>{<CardLabels cardLabelIds={labels} />}</div>
    </div>
  )
}
