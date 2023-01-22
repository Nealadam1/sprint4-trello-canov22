import React, { useState, useRef, useEffect } from "react"
import { CardList } from "../card/card-list"
import { GroupActions } from "./group-actions"
import {BsThreeDots} from "react-icons/bs"

export function GroupPreview({ group, cards, updateGroupTitle, isDragging, provided }) {
  const [groupTitleToInput, setGroupTitleToInput] = useState({})
  const [openEditGroupId, setOpenEditGroupId] = useState(null)
  const [newTitle, setNewTitle] = useState(group.title)
  const inputRef = useRef(null)

  const handleBlur = (event) => {
    updateGroupTitle(group, event.target.value)
    setGroupTitleToInput({ ...groupTitleToInput, [group.id]: false })
  }

  function handleEditButtonClick(ev, groupId) {
    if (openEditGroupId === groupId) {
      ev.stopPropagation()
      setOpenEditGroupId(null)
    } else {
      console.log(ev)
      ev.stopPropagation()
      setOpenEditGroupId(groupId)
    }
  }

  useEffect(() => {
    if (groupTitleToInput[group.id]) {
      inputRef.current.focus()
    }
  }, [groupTitleToInput, group.id])

  return (

    <div className="group-preview"
    // {...provided.draggableProps}
    // {...provided.dragHandleProps}
    // ref={provided.innerRef}
    >
      <button className="group-actions-btn " onClick={(ev) => handleEditButtonClick(ev, group.id)}>
        <BsThreeDots />
      </button>

      {openEditGroupId === group.id && <GroupActions handleEditButtonClick={handleEditButtonClick} group={group} />}
      {groupTitleToInput[group.id] ? (
        <form>
          <input
            className="group-title-input blue-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            ref={inputRef}
          />
        </form>
      ) : (
        <h4
          onClick={() =>
            setGroupTitleToInput({ ...groupTitleToInput, [group.id]: true })
          }
        >
          {newTitle}
        </h4>
      )}
      <CardList cards={cards} group={group} />
    </div>
  )
}
