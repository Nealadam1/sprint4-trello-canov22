import React, { useState } from "react"
import { useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faX } from "@fortawesome/free-solid-svg-icons"
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

export function CardList({ group }) {
  const { boardId, cardId } = useParams()
  const [cardToInput, setCardToInput] = useState(false)
  const [cardTitle, setCardTitle] = useState({ title: "" })
  const [cards, updateCards] = useState(group.cards)
  const [isMouseDown, setIsMouseDown] = useState(false)
  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  useEffect(() => {
    onEndDrag()
  }, [cards])

  function onAddCard(ev) {
    ev.preventDefault()
    const title = cardTitle.title
    const newCard = {
      title,
      description:''
    }
    addCard(newCard, group.id)
    setCardToInput(false)
    setCardTitle({ title: "" })
  }

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

  function handleChange({ target }) {
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

  return (
    <>
      <div className="card-list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {group.cards &&
                  group.cards.map((card, idx) => (
                    <Draggable key={card.id} draggableId={card.id} index={idx}>
                      {(provided) => (
                        <li
                          className={
                            card.checklists
                              ? "checklist"
                              : "" + " " + card.labelIds
                                ? "labels"
                                : ""
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Link
                            onClick={toCardDetails}
                            to={`/board/${boardId}/${card.id}`}
                          >
                            <CardPreview card={card} />
                            <div className="delete-card-btn">
                              <button
                                onClick={(event) =>
                                  onDeleteCard(event, card.id)
                                }
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                            </div>
                          </Link>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="bottom-container">
        {cardToInput ? (
          <form onSubmit={onAddCard}>
            <input
              type="text"
              onBlur={handleBlur}
              value={cardTitle.title}
              onChange={handleChange}
            />
            <button onMouseDown={handleMouseDown} type="submit">
              Add Card
            </button>
          </form>
        ) : (
          <button className="add-card" onClick={() => setCardToInput(true)}>
            <FontAwesomeIcon className="btn-icon" icon={faPlus} /> Add a card
          </button>
        )}
      </div>
    </>
  )
}
