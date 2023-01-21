import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../../../services/board.service"
import { addLabel, updateCard } from "../../../../store/actions/board.action"
import { TwitterPicker } from "react-color"
import { saveLabelToBoard } from "../../../../services/label.service"

export function LabelAction({ card }) {
  if (!card.labelIds) card.labelIds = []

  const board = useSelector((storeState) => storeState.boardModule.board)
  const labels = useSelector((storeState) => storeState.labelModule.labels)
  const [checkedState, setCheckedState] = useState(
    new Array(labels.length).fill(false)
  )
  const [newLabel, setNewLabel] = useState(boardService.getEmptyLabel())
  const [labelIds, setLabelIds] = useState(card.labelIds)
  const [currCard, setCurrCard] = useState(card)
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editLabelId, setEditLabelId] = useState(null)
  const [changeLabel, setChangeLabel] = useState(boardService.getEmptyLabel())
  const inputRef = useRef(null)

  useEffect(() => {
    setLabelIds([...labelIds])
  }, [currCard])

  function handleCheckboxChange(labelId) {
    setCurrCard({ ...card })
    const idx = labels.findIndex((label) => label.id === labelId)

    if (labelIds.includes(labelId)) {
      card.labelIds = labelIds.filter((id) => id !== labelId)
      updateCard(card)
      setLabelIds(labelIds.filter((id) => id !== labelId))
    } else {
      card.labelIds = [...labelIds, labelId]
      updateCard(card)
      setLabelIds([...labelIds, labelId])
    }

    setCheckedState((prevState) => {
      const newCheckedState = [...prevState]
      newCheckedState[idx] = !newCheckedState[idx]
      return newCheckedState
    })
  }

  function saveLabel(ev) {
    ev.stopPropagation()
    // setIsAdding(!isAdding)
    if (isAdding) {
      addLabel(newLabel)
      setIsAdding(false)
      saveLabelToBoard(newLabel, board)
      setNewLabel(boardService.getEmptyLabel())
    }

    if (isEditing) {
      console.log('editing');
      setIsEditing(false)
      saveLabelToBoard(changeLabel, board)
      console.log(changeLabel);
    }
  }

  function onAddLabel({ target }) {
    const { value, name } = target

    // console.log(value);
    setNewLabel({ ...newLabel, [name]: value })
  }

  function editLabel({ target }) {
    const { value, name } = target
    // console.log(labelId);
    const editLabel = board.labels.find(label => label.id === editLabelId)
    setChangeLabel(({ ...editLabel, [name]: value }))
    console.log(changeLabel);
    // setChangeLabel(prevState => ({ ...prevState, [name]: value }))
    // setIsAdding(!isAdding)
  }

  // console.log(newLabel);

  return (
    <div>
      {/* <TwitterPicker
      color={boardPreviewColor}
    /> */}

      {labels.map((label, idx) => {
        // console.log(label.id, idx);

        return (
          <div key={label.id} style={{ backgroundColor: label.color }}>
            <label>
              <input
                id={label.id}
                checked={labelIds.includes(label.id)}
                onChange={() => handleCheckboxChange(label.id)}
                inputId={label.id}
                type="checkbox"
              />
              {label.title}</label>

            <button onClick={(ev) => {
              setIsEditing(!isEditing)
              setEditLabelId(label.id)
            }}>edit</button>
          </div>
        )
      })}

      {(!isAdding && !isEditing) && (
        <button onClick={() => setIsAdding(!isAdding)}>add Label</button>
      )}
      {(isAdding && !isEditing) && (
        <form onSubmit={saveLabel}>
          <input
            type="text"
            name="title"
            value={newLabel.title}
            onChange={onAddLabel}
          />
        </form>
      )}
      {isEditing && (
        <form onSubmit={saveLabel}>
          <input
            type="text"
            name="title"
            value={changeLabel.title}
            onChange={editLabel}
          />
        </form>
      )}
    </div>
  )
}
