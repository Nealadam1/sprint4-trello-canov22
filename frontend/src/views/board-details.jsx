import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, Routes, Route } from "react-router-dom"
import { useParams } from "react-router"
import { BoardHeader } from "../cmps/board/board-header"
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { DragDropContext } from "react-beautiful-dnd"

import {
  addGroup,
  closeActionModal,
  deleteGroup,
  setBoard,
  setBoardById,
  updateBoard,
} from "../store/actions/board.action"
import { CardDetails } from "./card-details"
import { BoardDashboard } from "../cmps/board/board-dashboard"
import LoadingSpinner from "./spinner/loading-spinner"

export function BoardDetails() {
  const [GroupTitleToEdit, setGroupTitleToEdit] = useState(false)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { boardId } = useParams()
  // const [board, setBoard] = useState({})

  useEffect(() => {
    loadBoard(boardId)
  }, [boardId])

  async function loadBoard(boardId) {
    await boardService.getById(boardId).then((board) => {
      setBoard(board)
    })
  }

  function onAddGroup(title) {
    const newGroup = {
      title,
    }
    addGroup(newGroup)
  }

  function onDeleteGroup(groupId) {
    console.log(groupId, "ho")
    deleteGroup(groupId)
  }

  if (!board) return <LoadingSpinner />
  return (
    <div
      className="board-details"
      style={{
        backgroundColor: board?.style?.backgroundColor,
        backgroundImage: `url(${board?.style?.img})`,

        // background: `${
        //   board.style.img
        //     ? `url(${board.style.img})`
        //     : `${board.style.backgroundColor}`
        // }`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BoardHeader board={board} />
      {/* <GroupList
        GroupTitleToEdit={GroupTitleToEdit}
        setGroupTitleToEdit={setGroupTitleToEdit}
        board={board}
        onDeleteGroup={onDeleteGroup}
        onAddGroup={onAddGroup}
        groups={board.groups}
      /> */}

      <Outlet
        context={{
          GroupTitleToEdit,
          setGroupTitleToEdit,
          board,
          onDeleteGroup,
          onAddGroup,
          groups: board.groups,
        }}
      />
    </div>
  )
}
