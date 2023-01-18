import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { updateBoard } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"

export function CardList({ cards, group, groups }) {
  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  function onAddCard() {
    const title = prompt("Add a title please")
    const newCard = {
      id: utilService.makeId(),
      title,
    }
    cards = [...cards, newCard]
    const updatedGroup = { ...group, cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    currBoard = { ...currBoard, groups: updatedGroups }
    updateBoard(currBoard)
  }

  return (
    <>
      <div className="card-list">
        {cards &&
          cards.map((card) => (
            <li key={card.id}>
              <CardPreview card={card} />
            </li>
          ))}
      </div>
      <button onClick={onAddCard}>Add card +</button>
    </>
  )
}
