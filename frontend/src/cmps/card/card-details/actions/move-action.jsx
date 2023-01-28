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
    <div className="move-action">
      <p className="move-action-title">Move Card</p>
      <div className="sep-line"></div>
      <div className="move-action-container">
        <div className="select-group-input">
          <label className="group-label">Group</label>
          <span>
            {board.groups.find((group) => group.id === selectedGroup)?.title}
          </span>
          <select
            className="selected-group-action"
            value={selectedGroup}
            onChange={handleGroupChange}
          >
            <option value="" disabled>
              Select a group
            </option>
            {board.groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.title}
              </option>
            ))}
          </select>
        </div>
        <div className="select-card-input">
          <label className="position-label">Position</label>
          <span>
            {
              <span>
                {selectedCard !== "" ? parseInt(selectedCard) + 1 : ""}
              </span>
            }
          </span>
          <select
            className="selected-card-action"
            value={selectedCard}
            onChange={handleCardChange}
          >
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
        </div>
      </div>
      <button className="blue-button move-card-btn" onClick={handleMove}>
        Move
      </button>
    </div>
  )
}
