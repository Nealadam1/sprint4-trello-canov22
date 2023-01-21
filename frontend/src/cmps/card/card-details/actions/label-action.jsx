import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../../../services/board.service"
import { addLabel, updateCard } from "../../../../store/actions/board.action"
import { TwitterPicker } from "react-color"
import { saveLabelToBoard } from "../../../../services/label.service"
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
  const [boardPreviewColor, setBoardPreviewColor] = useState('')

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
      console.log(newLabel);

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

  function handleColorChange(backgroundColor, backgroundImg) {

    if (isAdding) {
      newLabel.color = backgroundColor.hex
    }

    if (isEditing) {

      console.log(backgroundColor.hex);
      console.log(changeLabel);
      changeLabel.color = backgroundColor.hex
    }

    // const { style } = newBoard
    // if (backgroundColor) {
    //   setBoardPreviewColor(backgroundColor.hex)
    //   style.backgroundColor = backgroundColor.hex
    //   setBoardPreviewImg("")
    // } else {
    //   setBoardPreviewImg(backgroundImg.thumbnail)
    //   style.backgroundColor = backgroundImg.backgroundColor
    //   style.img = backgroundImg.background
    //   style.thumbnail = backgroundImg.thumbnail
    // }
  }

  function removeLabel() {
    console.log('remove');
  }
  // console.log(newLabel);

  return (
    <div>
      {/* <TwitterPicker
      color={boardPreviewColor}
    /> */}

      {!(isAdding && !isEditing) && labels.map((label, idx) => {
        // console.log(label.id, idx);

        return (
          <div className="label-edit-display" key={label.id}>
            <input
              id={label.id}
              checked={labelIds.includes(label.id)}
              onChange={() => handleCheckboxChange(label.id)}
              inputId={label.id}
              type="checkbox"
            />
            <div >
              <label style={{ backgroundColor: label.color }} htmlFor={label.id}>{label.title}</label>
              <button onClick={(ev) => {
                setIsEditing(!isEditing)
                setEditLabelId(label.id)
              }}><BsPencil /></button>
            </div>


          </div>
        )
      })}

      {(!isAdding && !isEditing) && (
        <button onClick={() => setIsAdding(!isAdding)}>add Label</button>
      )}
      {(isAdding && !isEditing) && (
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
              onChange={handleColorChange} />
            <button>Save</button>
          </form>
          <button onClick={removeLabel}>Delete</button>
        </div>
      )}
      {isEditing && (
        <form onSubmit={saveLabel}>
          <input
            type="text"
            name="title"
            value={changeLabel.title}
            onChange={editLabel}
          />
          <TwitterPicker
            color={boardPreviewColor}
            onChange={handleColorChange} />

          <button>Save</button>
        </form>
      )}
    </div>
  )
}
