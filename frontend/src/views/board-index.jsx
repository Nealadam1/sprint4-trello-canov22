import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BoardList } from "../cmps/board/board-list"
import { boardService } from "../services/board.service"
import { loadBoards } from "../store/actions/board.action"

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [])



  return (
    <main className="board-index">
      <section>
        <BoardList boards={boards}/>
      </section>


      <div className="boards-list"></div>
      <div className="sidebar"></div>
    </main >
  )
}
