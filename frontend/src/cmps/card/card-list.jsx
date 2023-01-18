import React, { useState } from "react"
import { useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { utilService } from "../../services/util.service"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"

export function CardList({ group, groups }) {
  const { boardId, cardId } = useParams()
  const [cards, updateCards] = useState(group.cards)

  useEffect(() => {
    console.log(group);
    const updatedGroup = { ...group, cards: cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }, [cards])

  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  function onAddCard() {
    const title = prompt("Add a title please")
    const newCard = {
      id: utilService.makeId(),
      title,
    }

    group.cards
      ? (group.cards = [...group.cards, newCard])
      : (group.cards = [newCard])

    const updatedGroup = { ...group, cards: group.cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  function onDeleteCard(event, cardId) {
    event.stopPropagation()
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

                {group.cards &&
                  group.cards.map((card, idx) => (
                    <Draggable key={card.id} draggableId={card.id} index={idx}>

                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Link to={`/board/${boardId}/${card.id}`}>

                            <CardPreview card={card} />
                            <div className="delete-card-btn">

                              <button onClick={(event) => onDeleteCard(event, card.id)}>
                                X
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
      {cardId ? <Outlet /> : null}
      <button onClick={onAddCard}> + Add card</button>
    </>
  )
}
