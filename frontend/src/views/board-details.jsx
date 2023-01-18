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

  return (
    <div className="board-details">
      <GroupList groups={board.groups} />
    </div>
  )
}
