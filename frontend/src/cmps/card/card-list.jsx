import React, { useState } from "react"
import { useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons"

import { utilService } from "../../services/util.service"
import { openCardDetail, setBoard, updateBoard, } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"

export function CardList({ group, groups }) {
  const { boardId, cardId } = useParams()
  const [cards, updateCards] = useState(group.cards)
  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  useEffect(() => {

    const updatedGroup = { ...group, cards: cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })

  }, [cards])


  function onAddCard() {
    const title = prompt("Add a title please")
    const newCard = {
      id: utilService.makeId(),
      title,
    }

    group.cards ? (group.cards = [...group.cards, newCard]) : (group.cards = [newCard])

    const updatedGroup = { ...group, cards: group.cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  function onDeleteCard(event, cardId) {
    event.preventDefault()
    group.cards = group.cards.filter((card) => card.id !== cardId)
    const updatedGroup = { ...group, cards: group.cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  function handleOnDragEnd(result) {
    console.log('result', result);
    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCards(items)


  }
  console.log(cards);


  //backup
  // return (
  //   <>
  //     <div className="card-list">
  //       <ul>
  //         {group.cards &&
  //           group.cards.map((card) => (
  //             <li key={card.id}>
  //               <Link to={`/board/${boardId}/${card.id}`}>
  //                 <CardPreview card={card} />
  //                 <div className="delete-card-btn">
  //                   <button onClick={(event) => onDeleteCard(event, card.id)}>
  //                     X
  //                   </button>
  //                 </div>
  //               </Link>
  //             </li>
  //           ))}
  //       </ul>
  //     </div>
  //     {cardId ? <Outlet /> : null}
  //     <button onClick={onAddCard}> + Add card</button>
  //   </>
  // )


  // test on drag and drop
  return (
    <>
      <div className="card-list">

        <DragDropContext onDragEnd={handleOnDragEnd}>

          <Droppable droppableId="cards">

            {(provided) => (
              <ul ref={provided.innerRef}{...provided.droppableProps}>

                {group.cards && group.cards.map((card, idx) => (
                  <Draggable key={card.id} draggableId={card.id} index={idx}>

                    {(provided) => (
                      <li className={card.checklists ? 'checklist' : '' + ' ' + card.labelIds ? 'labels' : ''}
                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Link onClick={openCardDetail} to={`/board/${boardId}/${card.id}`}>

                          <CardPreview card={card} />
                          <div className="delete-card-btn">

                            <button onClick={(event) => onDeleteCard(event, card.id)}>
                              <FontAwesomeIcon className="btn-icon" icon={faX} />
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
        <button className="add-card" onClick={onAddCard}>
          <FontAwesomeIcon className="btn-icon" icon={faPlus} /> Add a card
        </button>

        {/* <button></button> */}
      </div>

    </>
  )
}
