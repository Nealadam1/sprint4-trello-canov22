import { useState } from "react"
import { updateCard } from "../../../store/actions/board.action"
import { GrTextAlignFull } from "react-icons/gr"

export function CardDescription({ card }) {
  const [isEditing, setIsEditing] = useState(card.description ? false : true)
  const [newDescription, setNewDescription] = useState(card.description)

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {
    card.description = newDescription
    updateCard(card)
    setIsEditing(false)
  }

  function handleCancleClick() {
    setIsEditing(false)
    setNewDescription(card.description)
  }

  function handleChange({ target }) {
    setNewDescription(target.value)
  }

  return (
    <div className="card-description">
      <h3>
        <i>
          <GrTextAlignFull />
        </i>
        Description
      </h3>
      {isEditing ? (
        <div>
          <textarea
            name="description"
            value={newDescription}
            onChange={handleChange}
          />
          <div>
            <button className="button" onClick={handleSaveClick}>
              Save
            </button>
            <button
              className="cancel-desc-btn button1"
              onClick={handleCancleClick}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p onClick={handleEditClick}>{newDescription}</p>
      )}
    </div>
  )
}
