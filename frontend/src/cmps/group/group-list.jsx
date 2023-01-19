import React, { useState } from "react"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { setBoard, updateBoard } from "../../store/actions/board.action"
import { GroupPreview } from "./group-preview"
import { Outlet, useParams } from "react-router"

export function GroupList({ groups, onAddGroup, onDeleteGroup, board }) {
  const { cardId } = useParams()
  const [groupToInput, setGroupToInput] = useState(false)
  const [groupTitleToInput, setGroupTitleToInput] = useState(false)
  const [groupTitle, setGroupTitle] = useState({ title: "" })

  function updateGroupTitle(group) {
    const newTitle = prompt("Pick new title")
    const updatedGroup = { ...group, title: newTitle }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...board, groups: updatedGroups })
    updateBoard({ ...board, groups: updatedGroups })
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result
    console.log(source)
    // handle the drag end event here
    // you can use the result object to determine the source and destination of the drag
  }

  function handleAddGroup() {
    const title = groupTitle.title
    onAddGroup(title)
    setGroupTitle({ title: "" })
    setGroupToInput(false)
  }

  function handleChange({ target }) {
    const { value } = target
    setGroupTitle({ title: value })
  }

  // return (
  //   <div className="group-list">
  //     {groups &&
  //       groups.map((group) => (
  //         <li className="group" key={group.id}>
  //           <GroupPreview
  //             updateGroupTitle={updateGroupTitle}
  //             cards={group.cards}
  //             group={group}
  //             groups={groups}
  //           />
  //           <button
  //             className="delete-group-btn"
  //             onClick={() => onDeleteGroup(group.id)}
  //           >
  //             X
  //           </button>
  //         </li>
  //       ))}
  //     <button className="add-group-btn" onClick={onAddGroup}>
  //       + Add another list
  //     </button>
  //   </div>
  // )
  // test for d&d for group

  function handleBlur() {
    setGroupToInput(false)
    setGroupTitle({ title: "" })
  }
  return (
    <div className="group-list">
      {groups &&
        groups.map((group) => (
          <div className="group" key={group.id}>
            {/* <button
            className="delete-group-btn"
            onClick={() => onDeleteGroup(group.id)}
          >X</button> */}
            <GroupPreview
              setGroupTitleToInput={setGroupTitleToInput}
              groupTitleToInput={groupTitleToInput}
              updateGroupTitle={updateGroupTitle}
              cards={group.cards}
              group={group}
              groups={groups}
            />
          </div>
        ))}
      {groupToInput ? (
        <form onSubmit={handleAddGroup}>
          <input
            onChange={handleChange}
            value={groupTitle.title}
            type="text"
            onBlur={handleBlur}
          />
        </form>
      ) : (
        <button className="add-group-btn" onClick={() => setGroupToInput(true)}>
          <FontAwesomeIcon className="btn-icon" icon={faPlus} /> Add another
          list
        </button>
      )}
      {cardId ? <Outlet /> : null}
    </div>
  )
}
