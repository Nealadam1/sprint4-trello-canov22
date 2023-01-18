import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { getCardById } from "../store/actions/board.action"

export function CardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [card, setCard] = useState(null)

  const { cardId } = useParams()

  useEffect(() => {
    getCardById(board, cardId)
  }, [cardId])

  function getCardById(board, cardId) {
    const cardGroup = board.groups.find((group) =>
      group.cards.find((card) => card.id === cardId)
    )
    setCard(cardGroup.cards.find((card) => card.id === cardId))
  }

  return <div className="card-details"></div>
}
