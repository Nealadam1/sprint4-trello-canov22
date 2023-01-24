import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../../../services/board.service"
import { addLabel, updateCard } from "../../../../store/actions/board.action"
import { TwitterPicker } from "react-color"
import {
  removeLabelFromBoard,
  saveLabelToBoard,
} from "../../../../services/label.service"
import { BsPencil } from "react-icons/bs"

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
  const [boardPreviewColor, setBoardPreviewColor] = useState("")

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
      setIsEditing(false)
      saveLabelToBoard({ ...changeLabel }, board)
    }
  }

  function onAddLabel({ target }) {
    const { value, name } = target
    setNewLabel({ ...newLabel, [name]: value })
  }

  function editLabel({ target }) {
    const { value, name } = target
    const editLabel = board.labels.find((label) => label.id === editLabelId)
    setChangeLabel({ ...editLabel, [name]: value })
  }

  function handleColorChange(backgroundColor, backgroundImg) {
    if (isAdding) {
      newLabel.color = backgroundColor.hex
    }

    if (isEditing) {
      changeLabel.color = backgroundColor.hex
    }
  }

  function removeLabel() {
    console.log("remove", editLabelId)
    let labelIdxRemove = card.labelIds.findIndex(
      (label) => editLabelId === label
    )
    console.log(labelIdxRemove)
    removeLabelFromBoard(editLabelId, board)
    card.labelIds.splice(labelIdxRemove, 1)
    updateCard(card)
  }

  return (
    <div>
      {/* <TwitterPicker
      color={boardPreviewColor}
    /> */}
      <p className="labels-action-header">Labels</p>
      <div className="sep-labels-action-line"></div>
      {!(isAdding && !isEditing) &&
        labels.map((label, idx) => {
          return (
            <div className="label-edit-display" key={label.id}>
              <input
                id={label.id}
                checked={labelIds.includes(label.id)}
                onChange={() => handleCheckboxChange(label.id)}
                inputid={label.id}
                type="checkbox"
              />
              <div>
                <label
                  style={{ backgroundColor: label.color }}
                  htmlFor={label.id}
                >
                  {label.title}
                </label>
                <button
                  onClick={(ev) => {
                    setIsEditing(!isEditing)
                    setEditLabelId(label.id)
                  }}
                >
                  <BsPencil />
                </button>
              </div>
            </div>
          )
        })}

      {!isAdding && !isEditing && (
        <button
          className="grey-button add-label"
          onClick={() => setIsAdding(!isAdding)}
        >
          Create a new label
        </button>
      )}
      {isAdding && !isEditing && (
        <div>
          <form onSubmit={saveLabel}>
            <input
              type="text"
              name="title"
              value={newLabel.title}
              onChange={onAddLabel}
            />
            <TwitterPicker
              color={boardPreviewColor}
              onChange={handleColorChange}
            />
            <button>Save</button>
          </form>
        </div>
      )}
      {isEditing && (
        <div>
          <form onSubmit={saveLabel}>
            <input
              type="text"
              name="title"
              value={changeLabel.title}
              onChange={editLabel}
            />
            <TwitterPicker
              color={boardPreviewColor}
              onChange={handleColorChange}
            />
            <button>Save</button>
          </form>
          <button onClick={removeLabel}>Delete</button>
        </div>
      )}
    </div>
  )
}
