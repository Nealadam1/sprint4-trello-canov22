import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../services/board.service"
import { loadBoards } from "../store/actions/board.action"

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])

  console.log(boards)

  return <h1>board-index</h1>
}
