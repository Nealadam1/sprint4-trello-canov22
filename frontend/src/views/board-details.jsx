import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { setBoardById, updateBoard } from "../store/actions/board.action"

export function BoardDetails() {
  const { boardId } = useParams()
  const [board, setBoard] = useState({})

  useEffect(() => {
    boardService.getById(boardId).then((board) => {
      setBoard(board)
      setBoardById(board._id)
    })
  }, [])

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

  return (
    <div className="board-details">
      <GroupList
        onDeleteGroup={onDeleteGroup}
        onAddGroup={onAddGroup}
        groups={board.groups}
      />
    </div>
  )
}
