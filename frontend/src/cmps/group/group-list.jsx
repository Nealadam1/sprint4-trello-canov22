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
  return (
    <div className="group-list">
      {groups && groups.map((group) => (
        <div className="group" key={group.id}>
          {/* <button
            className="delete-group-btn"
            onClick={() => onDeleteGroup(group.id)}
          >X</button> */}
          <GroupPreview
            updateGroupTitle={updateGroupTitle}
            cards={group.cards}
            group={group}
            groups={groups}
          />
        </div>
      ))}
      <button className="add-group-btn" onClick={onAddGroup}>
        <FontAwesomeIcon className="btn-icon" icon={faPlus} /> Add another list
      </button>
      {cardId ? <Outlet /> : null}
    </div>
  )
}
