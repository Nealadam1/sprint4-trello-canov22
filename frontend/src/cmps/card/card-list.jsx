import React, { useState } from "react"
import { useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { HiOutlinePencil } from "react-icons/hi"
import { CgClose } from "react-icons/cg"
import { AiOutlinePlus } from "react-icons/ai"

import {
  addCard,
  deleteCard,
  openCardDetail,
  setBoard,
  setGroup,
  updateBoard,
} from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"
import { useRef } from "react"
import { ADD_CARD, eventBus } from "../../services/event-bus.service"
import { CardDetailsShortcut } from "./card-details/actions/card-detail-shortcut"

export function CardList({ group,EditCardShortcut,setEditCardShortcut }) {
  const { boardId, cardId } = useParams()
  const [cardToInput, setCardToInput] = useState(false)
  const [cardTitle, setCardTitle] = useState({ title: "" })
  const [cards, updateCards] = useState(group.cards)
  const [isMouseDown, setIsMouseDown] = useState(false)

  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  const inputRef = useRef(null)
  const cardRef=useRef(null)
  useEffect(() => {
    const callAddCard = eventBus.on(ADD_CARD, (groupId) => {
      if (group.id === groupId) setCardToInput(true)
    })
    return () => {
      callAddCard()
    }
  })

  useEffect(() => {
    onEndDrag()
  }, [cards])

  function onAddCard(ev) {
    ev.preventDefault()
    const title = cardTitle.title
    const newCard = {
      title,
      description: "",
      style: {},
    }
    addCard(newCard, group.id)
    setCardToInput(false)
    setCardTitle({ title: "" })
  }

  useEffect(() => {
    if (cardToInput) {
      inputRef.current.focus()
    }
  }, [cardToInput])

  // console.log(inputRef)

  function onDeleteCard(event, cardId) {
    event.preventDefault()
    deleteCard(cardId, group.id)
  }

  function onEndDrag() {
    const updatedGroup = { ...group, cards: cards }
    const updatedGroups = currBoard.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  function handleOnDragEnd(result) {
    console.log("result", result)
    if (!result.destination) return
    const items = Array.from(cards)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateCards(items)
    onEndDrag()
  }

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  function handleChange(ev) {
    console.log(ev.target)
    const { target } = ev
    const { value } = target
    setCardTitle({ title: value })
  }

  function handleBlur() {
    if (isMouseDown) {
      setIsMouseDown(false)
      return
    }
    setCardToInput(false)
    setCardTitle({ title: "" })
  }

  function toCardDetails() {
    setGroup(group)
    openCardDetail()
  }

  function handleCloseCard() {
    setCardToInput(false)
    setCardTitle({ title: "" })
  }

  function handleEditShortcutButtonClick(ev, cardId) {
    if (EditCardShortcut === cardId) {
      ev.stopPropagation()
      setEditCardShortcut(null)
    } else {
      console.log(ev)
      ev.stopPropagation()
      setEditCardShortcut(cardId)
    }
  }

  return (
    <>
      <div className="card-list">
        <Droppable droppableId={group.id} type="card">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {group?.cards &&
                group?.cards?.map((card, idx) => (
                  <Draggable draggableId={card.id} index={idx} isDragDisabled={EditCardShortcut? true:false}>
                    {(provided, snapshot) => (
                      <li
                        className={
                          card?.checklists
                            ? "checklist"
                            : "" + " " + card?.labelIds
                              ? "labels"
                              : ""
                        }
                        style={{ zIndex: snapshot.isDragging ? 100 : null }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Link ref={cardRef}
                          onClick={toCardDetails}
                          to={`/board/${boardId}/${card.id}`}
                        >
                          <CardPreview idx={idx} card={card} />

                        </Link>
                        <div>
                          <button className="card-actions-btn" onClick={(ev) => handleEditShortcutButtonClick(ev, card.id)}>
                            <HiOutlinePencil />
                          </button>
                         
                          {EditCardShortcut === card.id && <CardDetailsShortcut setEditCardShortcut={setEditCardShortcut} group={group} card={card} cardRef={cardRef} />}
                          {EditCardShortcut === card.id &&  <div className="shortcut-modal" onClick={(ev) => handleEditShortcutButtonClick(ev, card.id)}></div>}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
              <div className="placeholder">{provided.placeholder}</div>
            </ul>
          )}
        </Droppable>
      </div>

      <div className="add-card-container">
        {cardToInput ? (
          <form onSubmit={onAddCard}>
            <textarea
              className="card-title-input"
              ref={inputRef}
              onBlur={handleBlur}
              value={cardTitle.title}
              onChange={handleChange}
              required
              placeholder="Enter list title..."
            />
            <div className="add-card-section">
              <button
                className="add-card-btn"
                onMouseDown={handleMouseDown}
                type="submit"
              >
                Add card
              </button>
              <button className="close-card-btn" onClick={handleCloseCard}>
                <CgClose />
              </button>
            </div>
          </form>
        ) : (
          <button className="add-card" onClick={() => setCardToInput(true)}>
            <span className="add-card-icon">
              <AiOutlinePlus />
              <span className="add-card-text"> Add a card</span>
            </span>
          </button>
        )}
      </div>
    </>
  )
}

// <>
//       <div className="card-list">
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="cards">
//             {(provided) => (
//               <ul ref={provided.innerRef} {...provided.droppableProps}>
//                 {group.cards &&
//                   group.cards.map((card, idx) => (
//                     <Draggable
//                       key={card?.id}
//                       draggableId={card?.id}
//                       index={idx}
//                     >
//                       {(provided) => (
//                         <li
//                           className={
//                             card.checklists
//                               ? "checklist"
//                               : "" + " " + card.labelIds
//                                 ? "labels"
//                                 : ""
//                           }
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                         >
//                           <Link
//                             onClick={toCardDetails}
//                             to={`/board/${boardId}/${card.id}`}
//                           >
//                             <CardPreview card={card} />
//                             <div>
//                               <button
//                                 className="delete-card-btn"
//                                 onClick={(event) =>
//                                   onDeleteCard(event, card.id)
//                                 }
//                               >
//                                 <HiOutlinePencil />
//                                 {/* <FontAwesomeIcon icon={faPen} /> */}
//                               </button>
//                             </div>
//                           </Link>
//                         </li>
//                       )}
//                     </Draggable>
//                   ))}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>

//       <div className="add-card-container">
//         {cardToInput ? (
//           <form onSubmit={onAddCard}>
//             <textarea
//               className="card-title-input"
//               ref={inputRef}
//               onBlur={handleBlur}
//               value={cardTitle.title}
//               onChange={handleChange}
//               placeholder="Enter list title..."
//             />
//             <div className="add-card-section">
//               <button
//                 className="add-card-btn"
//                 onMouseDown={handleMouseDown}
//                 type="submit"
//               >
//                 Add card
//               </button>
//               <button className="close-card-btn" onClick={handleCloseCard}>
//                 <CgClose />
//               </button>
//             </div>
//           </form>
//         ) : (
//           <button className="add-card" onClick={() => setCardToInput(true)}>
//             <span className="add-card-icon">
//               <AiOutlinePlus />
//               <span className="add-card-text"> Add a card</span>
//             </span>
//           </button>
//         )}
//       </div>
//     </>
