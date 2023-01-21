import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { boardService } from "../../../../services/board.service";
import { addLabel, saveLabelToBoard, updateCard } from "../../../../store/actions/board.action";
import { TwitterPicker } from "react-color"

export function LabelAction({ card }) {
  if (!card.labelIds) card.labelIds = []

  const board = useSelector((storeState) => storeState.boardModule.board)
  const labels = useSelector((storeState) => storeState.labelModule.labels)
  const [checkedState, setCheckedState] = useState(new Array(labels.length).fill(false))
  const [newLabel, setNewLabel] = useState(boardService.getEmptyLabel())
  const [labelIds, setLabelIds] = useState(card.labelIds)
  const [currCard, setCurrCard] = useState(card)
  const [isAdding, seIsAdding] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setLabelIds([...labelIds])
  }, [currCard])

  function handleCheckboxChange(labelId) {
    setCurrCard({ ...card })
    const idx = labels.findIndex(label => label.id === labelId)

    if (labelIds.includes(labelId)) {
      card.labelIds = labelIds.filter(id => id !== labelId)
      updateCard(card)
      setLabelIds(labelIds.filter(id => id !== labelId))
    } else {
      card.labelIds = [...labelIds, labelId]
      updateCard(card)
      setLabelIds([...labelIds, labelId])
    }

    setCheckedState(prevState => {
      const newCheckedState = [...prevState]
      newCheckedState[idx] = !newCheckedState[idx]
      return newCheckedState
    })
  }

  function saveLabel(ev) {
    ev.stopPropagation()
    seIsAdding(!isAdding)
    // console.log(newLabel);
    addLabel(newLabel)
    // console.log(board);
    saveLabelToBoard(newLabel, board)
  }


  function onAddLabel(ev) {
    const { target } = ev
    const { value, name } = target

    // console.log(value);
    setNewLabel({ ...newLabel, [name]: value })
  }

  // console.log(newLabel);

  return <div>
    {/* <TwitterPicker
      color={boardPreviewColor}
    /> */}

    {labels.map((label, idx) => {
      // console.log(label.id, idx);

      return (
        <div key={label.id} style={{ backgroundColor: label.color }}>

          <input
            id={label.id}
            checked={labelIds.includes(label.id)}
            onClick={() => handleCheckboxChange(label.id)}
            type="checkbox"
          />

          <label htmlFor={label.id}>{label.title}</label>
        </div>
      )
    })}


    {!isAdding && <button onClick={() => seIsAdding(!isAdding)}>add Label</button>}
    {isAdding &&
      <form onSubmit={saveLabel}>
        <input
          type="text"
          name="title"
          value={newLabel.title}
          onChange={onAddLabel} />
      </form>
    }

  </div>
}
