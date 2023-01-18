import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { GroupList } from "../cmps/group/group-list"
import { boardService } from "../services/board.service"

export function BoardDetails() {
  const { boardId } = useParams()
  const [board, setBoard] = useState({})

  useEffect(() => {
    boardService.getById(boardId).then(setBoard)
  }, [])

  function onAddGroup() {
    console.log("added list")
    console.log(board.groups)
  }

  return (
    <div className="board-details">
      <GroupList onAddGroup={onAddGroup} groups={board.groups} />
    </div>
  )
}
