import React from "react"
import { useSelector } from "react-redux"

export function BoardMembers() {
  const members =useSelector(storeState=> storeState.boardModule.board.members)
  console.log(members)

  return <h3>members</h3>
}
