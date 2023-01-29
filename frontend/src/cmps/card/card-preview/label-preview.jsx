import { useState } from "react"
import { CardLabels } from "../card-details/card-labels"
export function LabelPreview({ labels }) {
  const [openLabel, setOpenLabel] = useState(false)
  // console.log(labels);

  // labels.map(label => label)
  if (!labels?.length) return
  return <div key={labels}>{<CardLabels cardLabelIds={labels} />}</div>
}
