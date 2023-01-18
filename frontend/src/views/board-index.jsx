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

  async function onAddBoard() {
    const board = boardService.getEmptyBoard
  }

  return (
    <div className="board-index">
      <div className="boards-list">list</div>
      <div className="side-bar">side bar</div>
    </div>
  )
}
