import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router"
import { CgClose } from "react-icons/cg"
import { AiOutlinePlus } from "react-icons/ai"
import { setLabels, updateGroups } from "../../store/actions/board.action"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { GroupPreview } from "./group-preview"

import { GroupActions } from "./group-actions"
import { boardService } from "../../services/board.service"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { eventBus } from "../../services/event-bus.service"
import { useOutletContext } from "react-router"
import { socketService, SOCKET_EMIT_UPDATE_BOARD, SOCKET_EVENT_UPDATE_BOARD } from "../../services/socket.service"

export function GroupList() {
  const { groups, onAddGroup, onDeleteGroup, board, placeholderProps } =
    useOutletContext()
  const { cardId } = useParams()
  const [groupToInput, setGroupToInput] = useState(false)
  const [groupTitleToInput, setGroupTitleToInput] = useState(false)
  const [groupTitle, setGroupTitle] = useState({ title: "" })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const inputRef = useRef(null)
  let currGroups = useSelector(
    (storeState) => storeState.boardModule.board.groups
  )

  // console.log({ groups, onAddGroup, onDeleteGroup, board, placeholderProps })

  useEffect(() => {
    if (groupToInput) {
      inputRef.current.focus()
    }
  }, [groupToInput])

  useEffect(() => {
    onSetLabels()

    socketService.on(SOCKET_EVENT_UPDATE_BOARD, setBoard({ ...board }))


  }, [])

  function updateGroupTitle(group, title) {
    const updatedGroup = { ...group, title }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...board, groups: updatedGroups })
    updateBoard({ ...board, groups: updatedGroups })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, { ...board, groups: updatedGroups })

  }

  function onSetLabels() {
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

  function onDragEnd(resault, groups) {
    if (!resault.destination) return
    const { source, destination } = resault
    if (source.droppableId === "dnd-container") {
      const newGroups = groups
      const [removed] = newGroups.splice(source.index, 1)
      newGroups.splice(destination.index, 0, removed)
      updateGroups(newGroups)
      setBoard({ ...board, groups: newGroups })
      updateBoard({ ...board, groups: newGroups })
      return
    }
    if (+source.droppableId !== +destination.droppableId) {
      const sourceGroup = groups[+source.droppableId]
      const destGroup = groups[+destination.droppableId]
      const sourceCards = [...sourceGroup.cards]
      const destCards = [...destGroup.cards]
      const [removed] = sourceCards.splice(source.index, 1)
      destCards.splice(destination.index, 0, removed)
      const newGroups = [...groups]
      newGroups[+source.droppableId] = { ...sourceGroup, cards: sourceCards }
      newGroups[+destination.droppableId] = { ...destGroup, cards: destCards }
      updateGroups(newGroups)
      eventBus.emit("update-cards", { ...sourceGroup, cards: sourceCards })
      eventBus.emit("update-cards", { ...destGroup, cards: destCards })
      setBoard({ ...board, groups: newGroups })
      updateBoard({ ...board, groups: newGroups })
    } else {
      const group = groups[+source.droppableId]
      const copiedCards = [...group.cards]
      const [removed] = copiedCards.splice(source.index, 1)
      copiedCards.splice(destination.index, 0, removed)
      group.cards = copiedCards
      const newGroups = [...groups]
      newGroups[+source.droppableId] = group
      updateGroups(newGroups)
      eventBus.emit("update-cards", group)
      setBoard({ ...board, groups: newGroups })
      updateBoard({ ...board, groups: newGroups })
    }
  }

  function filteredGroups() {
    if (!groups) return []
    let updatedGroups = groups
    return updatedGroups.filter((group) => group.archivedAt === "")
  }

  return (
    <div className="group-list">
      <DragDropContext onDragEnd={(resault) => onDragEnd(resault, currGroups)}>
        <Droppable
          droppableId="dnd-container"
          direction="horizontal"
          type="group"
        >
          {(provided, snapshot) => {
            return (
              <div
                className="dnd-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredGroups()?.map((group, idx) => {
                  return (
                    <div key={group.id} className="scroll-container">
                      <Draggable
                        key={group.id}
                        draggableId={group.id}
                        index={idx}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className="group"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {
                                <GroupPreview
                                  idx={idx}
                                  key={group._id}
                                  setGroupTitleToInput={setGroupTitleToInput}
                                  groupTitleToInput={groupTitleToInput}
                                  updateGroupTitle={updateGroupTitle}
                                  cards={group.cards}
                                  group={group}
                                  groups={groups}
                                />
                              }
                            </div>
                          )
                        }}
                      </Draggable>
                    </div>
                  )
                })}
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
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
              <button
                className="add-new-group-btn"
                onMouseDown={handleMouseDown}
                type="submit"
              >
                Add list
              </button>
              <button className="close-group-btn" onClick={handleCloseGroup}>
                <CgClose />
              </button>
            </div>
          </form>
        ) : (
          <div className="add-group-list-btn">
            <button
              className="add-group-btn"
              onClick={() => setGroupToInput(true)}
            >
              <span className="add-group-title-icon">
                <AiOutlinePlus />
              </span>
              <span className="add-group-title-text">Add another list</span>
            </button>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  )
}
