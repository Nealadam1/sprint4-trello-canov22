import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import {
  setBoard,
  setBoardById,
  updateBoard,
} from "../store/actions/board.action"

export function BoardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.board)

  const { boardId } = useParams()
  // const [board, setBoard] = useState({})

  useEffect(() => {
    loadBoard(boardId)
  }, [])

  async function loadBoard(boardId) {
    await boardService.getById(boardId).then(setBoard)
  }

  function onAddGroup() {
    const title = prompt("add group title")
    const newGroup = {
      id: utilService.makeId(),
      title,
      archivedAt: "",
      card: [],
    }
    updateBoard({ ...board, groups: [...board.groups, newGroup] })
    setBoard({ ...board, groups: [...board.groups, newGroup] })
  }

  function onDeleteGroup(groupId) {
    const updatedGroups = board.groups.filter((group) => group.id !== groupId)
    updateBoard({ ...board, groups: updatedGroups })
    setBoard({ ...board, groups: updatedGroups })
  }

  if (!board) return <h1>Loading...</h1>
  return (
    <div className="board-details" style={board?.style}>
      <GroupList
        onDeleteGroup={onDeleteGroup}
        onAddGroup={onAddGroup}
        groups={board.groups}
      />
    </div>
  )
}
