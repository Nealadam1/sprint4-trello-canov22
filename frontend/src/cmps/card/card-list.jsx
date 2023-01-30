import React, { useState } from "react"
import { useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { HiOutlinePencil } from "react-icons/hi"
import { CgClose } from "react-icons/cg"
import { AiOutlinePlus } from "react-icons/ai"
import { addCard, openCardDetail, setGroup, } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"
import { useRef } from "react"
import { ADD_CARD, eventBus, UPDATE_CARDS } from "../../services/event-bus.service"
import { CardDetailsShortcut } from "./card-details/actions/card-detail-shortcut"

export function CardList({ group, EditCardShortcut, setEditCardShortcut }) {
  const { boardId, cardId } = useParams()
  const [cardToInput, setCardToInput] = useState(false)
  const [cardTitle, setCardTitle] = useState({ title: "" })
  const [cards, updateCards] = useState(group.cards)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isDrag, setIsDrag] = useState(true)

  let currBoard = useSelector((storeState) => storeState.boardModule.board)
  let filterCardBy = useSelector(
    (storeState) => storeState.boardModule.filterCardBy
  )
  const groupIdx = currBoard.groups.findIndex(g => group.id === g.id)

  const inputRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const callAddCard = eventBus.on(ADD_CARD, (groupId) => {
      if (group.id === groupId) setCardToInput(true)
    })
    return () => {
      callAddCard()
    }
  }, [])
  useEffect(() => {
    const callUpdateCards = eventBus.on(UPDATE_CARDS, (updatedGroup) => {
      if (group.id === updatedGroup.id) updateCards(updatedGroup.cards)
    })
    return () => {
      callUpdateCards()
    }
  }, [])

  useEffect(() => {
    filteredCards()
  }, [filterCardBy])


  function onAddCard(ev) {
    ev.preventDefault()
    const title = cardTitle.title
    const newCard = {
      id: `${Date.now()}`, //temp id 
      title,
      description: '',
      style: {},
      archivedAt: '',
    }
    addCard(newCard, group.id)
    setCardToInput(false)
    setCardTitle({ title: '' })
    updateCards([...cards, newCard])
  }

  useEffect(() => {
    if (cardToInput) {
      inputRef.current.focus()
    }
  }, [cardToInput])

  const handleMouseDown = () => {
    setIsMouseDown(true)
  }

  function handleChange(ev) {
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

  const filteredCards = () => {
    if (!group?.cards) return []
    let updatedCards = group.cards
    updatedCards = updatedCards.filter((card) => !card.archivedAt)

    if (filterCardBy.title) {
      updatedCards = updatedCards?.filter((card) =>
        card.title.toLowerCase().includes(filterCardBy.title.toLowerCase())
      )
    }
    if (filterCardBy?.labels?.length > 0) {
      updatedCards = updatedCards?.filter((card) => {
        return card?.labelIds?.some((labelId) =>
          filterCardBy?.labels?.includes(labelId)
        )
      })
    }
    if (filterCardBy?.members?.length > 0) {
      updatedCards = updatedCards?.filter((card) => {
        return card?.memberIds?.some((labelId) =>
          filterCardBy?.members?.includes(labelId)
        )
      })
    }
    return updatedCards
  }

  function handleEditShortcutButtonClick(ev, cardId) {
    if (EditCardShortcut === cardId) {
      ev.stopPropagation()
      setEditCardShortcut(null)
      setIsDrag(false)
    } else {
      ev.stopPropagation()
      setEditCardShortcut(cardId)
      setIsDrag(true)
    }
  }
  
  return (
    <>
      <div className="card-list" >
        <Droppable droppableId={`${groupIdx}`} type="card">
          {(provided, snapshot) => {
            return (
              <ul className="card-list-ul" {...provided.droppableProps} ref={provided.innerRef}>
                {cards &&
                  filteredCards()?.map((card, idx) => (
                    <Draggable key={card.id} draggableId={card.id} index={idx}>
                      {(provided, snapshot) => {
                        return (
                          <li ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className='card-list-item'
                          >
                            <Link ref={cardRef}
                              onClick={toCardDetails}
                              to={`/board/${boardId}/${card.id}`}
                            >
                              <CardPreview idx={idx} card={card} />
                            </Link>
                            <div>
                              <button
                                className="card-actions-btn"
                                onClick={(ev) =>
                                  handleEditShortcutButtonClick(ev, card.id)
                                }
                              >
                                <HiOutlinePencil />
                              </button>

                              {EditCardShortcut === card.id && (
                                <CardDetailsShortcut
                                  setEditCardShortcut={
                                    setEditCardShortcut} group={group} card={card}
                                  cardRef={cardRef}
                                />
                              )}
                              {EditCardShortcut === card.id && (
                                <div
                                  className="shortcut-modal"
                                  onClick={(ev) =>
                                    handleEditShortcutButtonClick(ev, card.id)
                                  }
                                ></div>
                              )}
                            </div>
                          </li>)
                      }}
                    </Draggable>
                  ))}
                <div style={{ opacity: 0.3 }}>
                  {provided.placeholder}
                </div>
              </ul>
            )
          }}
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

