import { useState } from "react"

export function CardDescription({ description }) {
  const [isEditing, setIsEditing] = useState(description? false:true)
  const [newDescription, setNewDescription] = useState(description)
  
  

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleSaveClick() {

    setIsEditing(false)
  }

  function handleCancleClick() {
    setIsEditing(false)
    setNewDescription(description);
  }

  function handleChange({ target }) {
    setNewDescription(target.value)
  }

  return (
    <div className="card-description">
      <h3>Description</h3>
      {isEditing? (
        <div>
          <textarea name="description"
            value={newDescription}
            onChange={handleChange} />
          <div>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancleClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <p onClick={handleEditClick}>
          {newDescription}
        </p>
      )}
    </div>
  )


}
