import React, { useEffect, useMemo, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router"
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd"
import { BsThreeDots } from "react-icons/bs"
import { CgClose } from "react-icons/cg"
import { AiOutlinePlus } from "react-icons/ai"

import { OpenActionModal, setLabels } from "../../store/actions/board.action"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { GroupPreview } from "./group-preview"

import { GroupActions } from "./group-actions"
import { boardService } from "../../services/board.service"

export function GroupList({
  groups,
  onAddGroup,
  onDeleteGroup,
  board,
  placeholderProps,
}) {
  const { cardId } = useParams()
  const [isDraggable, setIsDraggable] = useState(false)
  const [currGroup, setCurrGroup] = useState(null)
  const [groupToInput, setGroupToInput] = useState(false)
  const [groupTitleToInput, setGroupTitleToInput] = useState(false)
  const [groupTitle, setGroupTitle] = useState({ title: "" })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const inputRef = useRef(null)

  groups = groups.filter(group => group.archivedAt === '')

  useEffect(() => {
    if (groupToInput) {
      inputRef.current.focus()
    }
  }, [groupToInput])

  useEffect(() => {
    onSetLabels()
  }, [])

  function updateGroupTitle(group, title) {
    const updatedGroup = { ...group, title }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...board, groups: updatedGroups })
    updateBoard({ ...board, groups: updatedGroups })
  }

  function onSetLabels() {
    // console.log('board labels', board.labels);
    setLabels(board.labels)
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

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  function handleBlur() {
    if (isMouseDown) {
      setIsMouseDown(false)
      return
    }
    setGroupToInput(false)
    setGroupTitle({ title: "" })
  }

  function handleCloseGroup() {
    setGroupToInput(false)
    setGroupTitle({ title: "" })
  }

  function handleOnDragEnd(result) {
    const { source, destination } = result
    if ((!result.destination) || (destination.droppableId === source.droppableId) && (destination.index === source.index)) return
    // console.log(board);

    boardService.updateDrag(result, board)
    setBoard({ ...board })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={board._id} direction="horizontal" type="group" mode="virtual">

        {(provided, snapshot) => (
          <div className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="dnd-container">
              {groups &&
                groups.map((group, idx) => (


                  <div className="scroll-container">
                    <div className="group" key={group.id}>

                      <GroupPreview
                        provided={provided}
                        idx={idx}
                        key={group._id}
                        setGroupTitleToInput={setGroupTitleToInput}
                        groupTitleToInput={groupTitleToInput}
                        updateGroupTitle={updateGroupTitle}
                        cards={group.cards}
                        group={group}
                        isDragging={snapshot.isDragging}
                        groups={groups} />

                      {provided.placeholder}
                    </div>
                  </div>


                ))}

            </div>
            <div className="add-group-container">
              {groupToInput ? (
                <form
                  style={{
                    background: "white",
                    padding: "5px",
                    borderRadius: "0.2em",
                  }}
                  onSubmit={handleAddGroup}
                >
                  <input
                    className="group-title-input"
                    onChange={handleChange}
                    value={groupTitle.title}
                    type="text"
                    onBlur={handleBlur}
                    ref={inputRef}
                  />
                  <div className="add-group-section">
                    <button className="add-new-group-btn" onMouseDown={handleMouseDown} type="submit">
                      Add list
                    </button>
                    <button className="close-group-btn" onClick={handleCloseGroup}>
                      <CgClose />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="add-group-list-btn">
                  <button className="add-group-btn" onClick={() => setGroupToInput(true)}>
                    <span className="add-group-title-icon">
                      <AiOutlinePlus />
                    </span>
                    <span className="add-group-title-text">Add another list</span>
                  </button>
                </div>
              )}
            </div>
            {cardId ? <Outlet /> : null}
          </div>
        )}

      </Droppable>
    </DragDropContext>
  )
}
