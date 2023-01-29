import { useState } from "react"
import { updateCard } from "../../../store/actions/board.action"
import { GrTextAlignFull } from "react-icons/gr"

export function CardDescription({ card }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(card.description)

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {
    card.description = newDescription
    updateCard(card, "CHANGE_DESCRIPTION")
    setIsEditing(false)
  }

  function handleCancleClick() {
    setIsEditing(false)
    setNewDescription(card.description)
  }

  function handleChange({ target }) {
    setNewDescription(target.value)
  }

  console.log(card)

  return (
    <div className="card-description">
      <h3>
        <i>
          <GrTextAlignFull />
        </i>
        Description
      </h3>
      {isEditing ? (
        <div className="desc-textarea">
          <textarea
            className="card-title-description"
            name="description"
            cols={60}
            rows={6}
            value={newDescription}
            onChange={handleChange}
          />
          <div className="card-desc-btns">
            <button
              style={{ padding: "6px 10px" }}
              className="blue-button"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="cancel-desc-btn grey-button"
              onClick={handleCancleClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p
          // style={{
          //   background:
          //     card?.title === "Add a more detailed description..."
          //       ? "inherit"
          //       : "rgba(9, 30, 66, 0.0392156863)",
          // }}
          onClick={handleEditClick}
        >
          {newDescription
            ? newDescription
            : "Add a more detailed description..."}
        </p>
      )}
    </div>
  )
}
