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
  const [isDraggable, setIsDraggable] = useState(false)
  const [currGroup, setCurrGroup] = useState(null)

  function updateGroupTitle(group) {
    const newTitle = prompt("Pick new title")
    const updatedGroup = { ...group, title: newTitle }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...board, groups: updatedGroups })
    updateBoard({ ...board, groups: updatedGroups })
  }


  function handleOnDragEnd(result) {
    // console.log('result', result);
    setCurrGroup(groups.find(group => result.draggableId === group.id))
    if (!result.destination) return;
    const { destination, source, draggableId, type } = result

    // const items = Array.from(cards);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // updateCards(items)


  }
  console.log(currGroup);

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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="groups" direction="horizontal" type="column">
          {(provided) => (
            <div className="test" ref={provided.innerRef}{...provided.droppableProps}>
              {groups && groups.map((group, idx) => (
                <Draggable key={group.id} draggableId={group.id} index={idx}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div className="group" key={group.id}  {...provided.dragHandleProps}>
                        <button
                          className="delete-group-btn"
                          onClick={() => onDeleteGroup(group.id)}>
                          X</button>
                        <GroupPreview
                          updateGroupTitle={updateGroupTitle}
                          cards={group.cards}
                          group={group}
                          groups={groups} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <button className="add-group-btn" onClick={onAddGroup}>
          <FontAwesomeIcon className="btn-icon" icon={faPlus} /> Add another list
        </button>

        {cardId ? <Outlet /> : null}

      </DragDropContext>

    </div>
  )
}
