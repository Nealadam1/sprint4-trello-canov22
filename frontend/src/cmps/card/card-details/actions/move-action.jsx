import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { moveCard } from "../../../../store/actions/board.action"

export function MoveAction({ card }) {
  const [selectedGroup, setSelectedGroup] = useState("")
  const [selectedCard, setSelectedCard] = useState("")

  const board = useSelector((storeState) => storeState.boardModule.board)

  useEffect(() => {
    const group = board.groups.find((group) =>
      group.cards.find((currCard) => currCard.id === card.id)
    )
    if (group) {
      setSelectedGroup(group.id)
    }
    const cardIndex = group?.cards.findIndex(
      (currCard) => currCard.id === card.id
    )
    if (cardIndex !== -1) {
      setSelectedCard(cardIndex)
    }
  }, [card, board])

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value)
    setSelectedCard("")
  }

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value)
  }

  const handleMove = () => {
    if (selectedGroup && selectedCard !== "") {
      moveCard(card.id, selectedGroup, selectedCard)
    }
  }

  return (
    <div>
      <label>Select Group:</label>
      <select value={selectedGroup} onChange={handleGroupChange}>
        <option value="" disabled>
          Select a group
        </option>
        {board.groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.title}
          </option>
        ))}
      </select>
      <label>Select Card:</label>
      <select value={selectedCard} onChange={handleCardChange}>
        <option value="" disabled>
          Select a card
        </option>
        {selectedGroup &&
          board.groups
            .find((group) => group.id === selectedGroup)
            .cards.map((card, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
      </select>
      <button onClick={handleMove}>Move</button>
    </div>
  )
}
