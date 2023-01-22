import React, { useEffect, useMemo, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Outlet, useParams } from "react-router"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { BsThreeDots } from "react-icons/bs"
import { CgClose } from "react-icons/cg"
import { AiOutlinePlus } from "react-icons/ai"

import { OpenActionModal, setLabels } from "../../store/actions/board.action"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { GroupPreview } from "./group-preview"

import { GroupActions } from "./group-actions"


export function GroupList({ groups, onAddGroup, onDeleteGroup, board, placeholderProps }) {
  const { cardId } = useParams()
  const [isDraggable, setIsDraggable] = useState(false)
  const [currGroup, setCurrGroup] = useState(null)
  const [groupToInput, setGroupToInput] = useState(false)
  const [groupTitleToInput, setGroupTitleToInput] = useState(false)
  const [groupTitle, setGroupTitle] = useState({ title: "" })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [openEditGroupId, setOpenEditGroupId] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (groupToInput) {
      inputRef.current.focus()
    }
  }, [groupToInput])

  useEffect(() => {
    onSetLabels()
  }, [])

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

  function onDragEnd(result) {
    const { source, destination } = result
    if (!result.destination ||
      destination.droppableId === source.droppableId &&
      destination.index === source.index) return
    // updateDrag(result)
  }

  return (
    <Droppable droppableId={board._id} direction="horizontal" type="group" mode="virtual">
      {(provided, snapshot) => (

        <div className="group-list" {...provided.droppableProps} ref={provided.innerRef}>

          <div className="dnd-container">

            {groups &&
              groups.map((group, idx) => (
                <Draggable draggableId={group.id} key={group.id} index={idx}>
                  {(provided, snapshot) => (

                    <div className="scroll-container">
                      <div className="group" key={group.id}>

                        <button className="group-actions-btn " onClick={(ev) => handleEditButtonClick(ev, group.id)}>
                          <BsThreeDots />
                        </button>
                        {openEditGroupId === group.id && <GroupActions handleEditButtonClick={handleEditButtonClick} group={group} />}

                        <GroupPreview
                          provided={provided}
                          idx={idx}
                          key={group._id}
                          setGroupTitleToInput={setGroupTitleToInput}
                          groupTitleToInput={groupTitleToInput}
                          updateGroupTitle={updateGroupTitle}
                          cards={group.cards}
                          group={group}
                          groups={groups} />
                        {provided.placeholder}
                      </div>
                    </div>

                  )}
                </Draggable>
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
  )
}


// return (
//   <div className="group-list">

//     <div
//       className="dnd-container"
//     // ref={provided.innerRef}
//     // {...provided.droppableProps}
//     >
//       {groups &&
//         groups.map((group, idx) => (
//           <div className="scroll-container">
//             <div className="group">
//               <button className="group-actions-btn" onClick={() => handleEditButtonClick(group.id)}>
//                 <CgClose />
//               </button>
//               {openEditGroupId === group.id && <GroupActions handleEditButtonClick={handleEditButtonClick} group={group} />}
//               <GroupPreview
//                 setGroupTitleToInput={setGroupTitleToInput}
//                 groupTitleToInput={groupTitleToInput}
//                 updateGroupTitle={updateGroupTitle}
//                 cards={group.cards}
//                 group={group}
//                 groups={groups}
//               />
//             </div>
//           </div>
//         ))}
//       {/* {provided.placeholder} */}
//     </div>

//     <div className="add-group-container">
//       {groupToInput ? (
//         <form
//           style={{
//             background: "white",
//             padding: "5px",
//             borderRadius: "0.2em",
//           }}
//           onSubmit={handleAddGroup}
//         >
//           <input
//             className="group-title-input"
//             onChange={handleChange}
//             value={groupTitle.title}
//             type="text"
//             onBlur={handleBlur}
//             ref={inputRef}
//           />
//           <div className="add-group-section">
//             <button
//               className="add-new-group-btn"
//               onMouseDown={handleMouseDown}
//               type="submit"
//             >
//               Add list
//             </button>
//             <button className="close-group-btn" onClick={handleCloseGroup}>
//               <CgClose />
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="add-group-list-btn">
//           <button
//             className="add-group-btn"
//             onClick={() => setGroupToInput(true)}
//           >
//             <span className="add-group-title-icon">
//               <AiOutlinePlus />
//             </span>
//             <span className="add-group-title-text">Add another list</span>
//           </button>
//         </div>
//       )}
//     </div>
//     {cardId ? <Outlet /> : null}
//   </div>
// )