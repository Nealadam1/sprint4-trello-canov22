import { CardLabels } from "../card-details/card-labels"
export function LabelPreview({ labels }) {
  if (!labels?.length) return
  return <div key={labels}>{<CardLabels cardLabels={labels} />}</div>
}
