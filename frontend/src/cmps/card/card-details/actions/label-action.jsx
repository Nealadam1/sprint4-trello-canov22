import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../../../services/board.service"
import {
  addLabel,
  closeActionModal,
  updateBoard,
  updateCard,
} from "../../../../store/actions/board.action"
import { TwitterPicker } from "react-color"
import {
  removeLabelFromBoard,
  saveLabelToBoard,
} from "../../../../services/label.service"
import { BsPencil } from "react-icons/bs"
import { FaLessThan } from "react-icons/fa"
import { MdExpandLess } from "react-icons/md"
import { utilService } from "../../../../services/util.service"
import { CgClose } from "react-icons/cg"

export function LabelAction({ card }) {
  if (!card.labelIds) card.labelIds = []

  const [board, setBoard] = useState(
    useSelector((storeState) => storeState.boardModule.board)
  )
  const [labels, setLabels] = useState(
    useSelector((storeState) => storeState.labelModule.labels)
  )
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
  const [boardPreviewColor, setBoardPreviewColor] = useState("")

  useEffect(() => {
    setLabelIds([...labelIds])
  }, [currCard])

  useEffect(() => {
    setCurrCard({ ...card, labelIds: [...card.labelIds] })
  }, [card])

  function handleCheckboxChange(labelId) {
    setCurrCard({ ...card })
    const idx = labels.findIndex((label) => label.id === labelId)

    if (labelIds.includes(labelId)) {
      card.labelIds = labelIds.filter((id) => id !== labelId)
      setLabelIds(labelIds.filter((id) => id !== labelId))
      updateCard(card, "REMOVE_LABEL")
    } else {
      card.labelIds = [...labelIds, labelId]
      updateCard(card, "ADD_LABEL")
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
    if (isAdding) {
      addLabel(newLabel)
      setIsAdding(false)
      saveLabelToBoard(newLabel, board)
      setNewLabel(boardService.getEmptyLabel())
      setLabels([...board.labels])
    }

    if (isEditing) {
      setIsEditing(false)
      saveLabelToBoard({ ...changeLabel }, board)
      setBoard({ ...board, labels: [...board.labels] })
      setLabels([...board.labels])
      setChangeLabel(boardService.getEmptyLabel())
      setIsAdding(false)
      setIsEditing(false)
    }
  }

  function onAddLabel({ target }) {
    const { value, name } = target
    setNewLabel({ ...newLabel, [name]: value })
  }

  function editLabel({ target }) {
    const { value, name } = target
    const editLabel = board.labels.find((label) => label.id === editLabelId)
    card.labelIds = labelIds.map((label) =>
      label.id === editLabel.id ? editLabel : label
    )

    setChangeLabel({ ...editLabel, [name]: value })
  }

  function handleColorChange(backgroundColor, backgroundImg) {
    if (isAdding) {
      newLabel.color = backgroundColor.hex
    }

    if (isEditing) {
      setChangeLabel({ ...changeLabel, color: backgroundColor.hex })
      // changeLabel.color = backgroundColor.hex
    }
  }

  function removeLabel() {
    let labelIdxRemove = card.labelIds.findIndex(
      (label) => editLabelId === label
    )
    removeLabelFromBoard(editLabelId, board)
    card.labelIds.splice(labelIdxRemove, 1)
    updateCard(card, "REMOVE_LABEL")
    setLabels([...board.labels])
  }

  return (
    <div>
      <p className="labels-action-header" style={{ display: "flex" }}>
        {(isAdding || isEditing) && (
          <button
            style={{
              backgroundColor: "transparent",
              fontSize: "20px",
              rotate: "270deg",
            }}
            onClick={() => {
              setIsAdding(false)
              setIsEditing(false)
            }}
          >
            <MdExpandLess />
          </button>
        )}
        <div style={{ flexGrow: "1" }} className="add-cover-header">
          <p>
            Labels
            <i onClick={closeActionModal}>
              <CgClose />
            </i>
          </p>
        </div>
      </p>
      <div className="sep-labels-action-line"></div>

      {!isAdding &&
        !isEditing &&
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
              <div className="color-label-container">
                <label
                  style={{
                    backgroundColor: utilService.lightenColor(label.color),
                  }}
                  htmlFor={label.id}
                >
                  {label.title}
                </label>
                <span
                  style={{
                    backgroundColor: label.color,
                  }}
                  className="circle"
                ></span>
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
        <div className="label-editor">
          <form onSubmit={saveLabel}>
            <input
              type="text"
              className="blue-input"
              name="title"
              value={newLabel.title}
              onChange={onAddLabel}
            />
            <TwitterPicker
              colors={[
                "#B7DDB0",
                "#F5EA92",
                "#FAD29C",
                "#EFB3AB",
                "#F7F0FA",
                "#7BC86C",
                "#F5DD29",
                "#FFAF3F",
                "#EF7564",
                "#CD8DE5",
                "#5AAC44",
                "#E6C60D",
                "#E79217",
                "#CF513D",
                "#A86CC1",
                "#8BBDD9",
                "#8FDFEB",
                "#172b4d",
                "#F9C2E4",
                "#505F79",
                "#5BA4CF",
                "#29CCE5",
                "#6DECA9",
                "#FF8ED4",
              ]}
              color={boardPreviewColor}
              onChange={handleColorChange}
            />
            <button
              onClick={saveLabel}
              className="blue-button"
              disabled={newLabel.title.length < 1}
            >
              Save
            </button>
          </form>
        </div>
      )}

      {isEditing && (
        <div className="label-editor">
          <form onSubmit={saveLabel} action="onSubmit">
            <input
              type="text"
              name="title"
              value={changeLabel.title}
              className="blue-input"
              onChange={editLabel}
            />
            <TwitterPicker
              colors={[
                "#B7DDB0",
                "#F5EA92",
                "#FAD29C",
                "#EFB3AB",
                "#F7F0FA",
                "#7BC86C",
                "#F5DD29",
                "#FFAF3F",
                "#EF7564",
                "#CD8DE5",
                "#5AAC44",
                "#E6C60D",
                "#E79217",
                "#CF513D",
                "#A86CC1",
                "#8BBDD9",
                "#8FDFEB",
                "#172b4d",
                "#F9C2E4",
                "#505F79",
                "#5BA4CF",
                "#29CCE5",
                "#6DECA9",
                "#FF8ED4",
              ]}
              color={boardPreviewColor}
              onChange={handleColorChange}
            />

            <div className="label-button-container">
              <button
                className="blue-button"
                disabled={changeLabel.title.length < 1}
              >
                Save
              </button>
              <button
                className="grey-button"
                style={{
                  backgroundColor: "#b04632",
                  color: "white",
                  borderRadius: "2px",
                }}
                onClick={() => {
                  removeLabel()
                  setIsEditing(false)
                }}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
