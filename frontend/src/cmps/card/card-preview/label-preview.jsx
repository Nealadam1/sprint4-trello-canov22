import { CardLabels } from "../card-details/card-labels"
export function LabelPreview({ labels }) {
  // console.log(labels);

  // labels.map(label => label)
  return <div key={labels}>{<CardLabels cardLabels={labels}/>}</div>
}
