import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { updateBoard } from "../../store/actions/board.action"
import { CardPreview } from "./card-preview"

export function CardList({ cards, group, groups }) {
  const currBoard = useSelector((storeState) => storeState.boardModule.board)

  console.log("group", group)
  console.log(currBoard)

  function onAddCard() {
    const title = prompt("Add a title please")
    const newCard = {
      id: utilService.makeId(),
      title,
    }

    cards = [...cards, newCard]
    // console.log("updated Cards", updatedCards)

    const updatedGroup = { ...group, cards }

    console.log({ ...currBoard, groups: [...groups, updatedGroup] })

    // const updatedGroups = { ...groups, group: updatedGroup }

    // console.log("Updated Groups", updatedGroups)

    // const updatedBoard = { ...currBoard, groups: updatedGroups }
    // console.log(updatedBoard)
  }

  return (
    <>
      <div className="card-list">
        {cards &&
          cards.map((card) => (
            <li>
              <CardPreview card={card} />
            </li>
          ))}
      </div>
      <button onClick={onAddCard}>Add card +</button>
    </>
  )
}
