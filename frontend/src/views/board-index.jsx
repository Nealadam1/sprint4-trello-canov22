import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { BoardList } from "../cmps/board/board-list"
import { BoardSearch } from "../cmps/board/board-search"
import { SideBar } from "../cmps/side-bar"
import { boardService } from "../services/board.service"
import { socketService, SOCKET_EVENT_UPDATE_BOARDS } from "../services/socket.service"
import { loadBoards, setBoard } from "../store/actions/board.action"

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)

  useEffect(() => {
    if (board) setBoard(null)
    loadBoards()
    socketService.on(SOCKET_EVENT_UPDATE_BOARDS, loadBoards)
  }, [])

  function onLoadBoards(searchBy) {
    loadBoards(searchBy).catch((err) => {
      console.log("cannot Load boards")
    })
  }

  function setSearch(searchBy) {
    onLoadBoards(searchBy)
  }

  return (
    <main className="board-index">
      <section className="boards-list">
        {/* <BoardSearch onSetSearch={setSearch} /> */}
        <BoardList boards={boards} />
      </section>
      <div className="main-side-bar">
        <SideBar />
      </div>
    </main>
  )
}
