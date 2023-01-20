import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { BoardHeader } from "../cmps/board/board-header"
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import {
  addGroup,
  closeActionModal,
  deleteGroup,
  setBoard,
  setBoardById,
  updateBoard,
} from "../store/actions/board.action"

export function BoardDetails() {
  const [GroupTitleToEdit, setGroupTitleToEdit] = useState(false)
  const board = useSelector((storeState) => storeState.boardModule.board)

  const { boardId } = useParams()
  // const [board, setBoard] = useState({})

  useEffect(() => {
    loadBoard(boardId)
  }, [])

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

  if (!board) return <h1>Loading...</h1>
  return (
    <div
      className="board-details"
      style={{
        background: `${
          board.style.img
            ? `url(${board.style.img})`
            : `${board.style.backgroundColor}`
        }`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BoardHeader board={board} />
      <GroupList
        GroupTitleToEdit={GroupTitleToEdit}
        setGroupTitleToEdit={setGroupTitleToEdit}
        board={board}
        onDeleteGroup={onDeleteGroup}
        onAddGroup={onAddGroup}
        groups={board.groups}
      />
    </div>
  )
}
