import { useState } from "react";
import { useSelector } from "react-redux";
import { boardService } from "../../../../services/board.service";

export function LabelAction({ card }) {
  const labels = useSelector((storeState) => storeState.labelModule.labels)
  const [currCard, setCurrCard] = useState(card)
  const [checkboxState, setCheckboxState] = useState(boardService.createLabelCheckboxData(card.labelIds))
  const { labelIds } = card

  // const
  // console.log(boardService.createLabelCheckboxData(card.labelIds));
  console.log('labels', labels);

  function onChangeLabel({ target }) {
    const { value, name } = target
    console.log(value);

    setCurrCard({ ...currCard, labelIds: [...currCard.labelIds, value] })


  }
  console.log('card', currCard);

  return <div>
    {labels.map(label => {
      console.log(labelIds.includes(label.id));

      return (
        <div key={label.id} style={{ backgroundColor: label.color }}>
          <input id={label.id}
            checked={labelIds.includes(label.id)}
            value={label.id} name='labelIds'
            onChange={onChangeLabel}
            type="checkbox" />

          <label htmlFor={label.id}>{label.title}</label>
        </div>
      )
    })}
  </div>
}
