import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"

export function CardList({ group, groups }) {
  let currBoard = useSelector((storeState) => storeState.boardModule.board)

  function onAddCard() {
    const title = prompt("Add a title please")
    const newCard = {
      id: utilService.makeId(),
      title,
    }
    group.cards = [...group.cards, newCard]
    const updatedGroup = { ...group, cards: group.cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  function onDeleteCard(cardId) {
    group.cards = group.cards.filter((card) => card.id !== cardId)
    const updatedGroup = { ...group, cards: group.cards }
    const updatedGroups = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    )
    setBoard({ ...currBoard, groups: updatedGroups })
    updateBoard({ ...currBoard, groups: updatedGroups })
  }

  return (
    <>
      <div className="card-list">
        {group.cards &&
          group.cards.map((card) => (
            <li key={card.id}>
              <CardPreview card={card} />
              <div className="delete-card-btn">
                <button onClick={() => onDeleteCard(card.id)}>X</button>
              </div>
            </li>
          ))}
      </div>
      <button onClick={onAddCard}> + Add card</button>
    </>
  )
}
