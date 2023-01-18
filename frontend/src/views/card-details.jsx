import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { getCardById } from "../store/actions/board.action"

export function CardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)

  const { cardId } = useParams()

  useEffect(() => {
    getCardById(board, cardId)
  }, [cardId])

  return <div className="card-details"></div>
}
