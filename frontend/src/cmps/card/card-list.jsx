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
  openCardDetail,
  setGroup,
} from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"
import { useRef } from "react"
import { ADD_CARD, eventBus } from "../../services/event-bus.service"
import { CardDetailsShortcut } from "./card-details/actions/card-detail-shortcut"

export function CardList({ group, EditCardShortcut, setEditCardShortcut }) {
  const { boardId, cardId } = useParams()
  const [cardToInput, setCardToInput] = useState(false)
  const [cardTitle, setCardTitle] = useState({ title: "" })
  const [isMouseDown, setIsMouseDown] = useState(false)

  let filterCardBy = useSelector(
    (storeState) => storeState.boardModule.filterCardBy
  )

  const inputRef = useRef(null)

  useEffect(() => {
    const callAddCard = eventBus.on(ADD_CARD, (groupId) => {
      if (group.id === groupId) setCardToInput(true)
    })
    return () => {
      callAddCard()
    }
  }, [])

  useEffect(() => {
    filteredCards()
  }, [filterCardBy])

  function onAddCard(ev) {
    ev.preventDefault()
    const title = cardTitle.title
    const newCard = {
      title,
      description: "",
      style: {},
      archivedAt: "",
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
              {filteredCards()?.map((card, idx) => (
                <Draggable
                  draggableId={card.id}
                  index={idx}
                  isDragDisabled={EditCardShortcut ? true : false}
                >
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
                      <Link
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
                            setEditCardShortcut={setEditCardShortcut}
                            group={group}
                            card={card}
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
