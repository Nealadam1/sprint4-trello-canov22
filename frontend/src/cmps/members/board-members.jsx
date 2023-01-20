import React from "react"
import { useSelector } from "react-redux"

export function BoardMembers() {
  const members = useSelector(storeState => storeState.boardModule.board.members)
  console.log(members)

  return (
  <div className="board-members">
    <div className="member-images">
      {members.map((member, idx) => (
        <img key={idx} className="member-image" alt="" src={member.imgUrl} />
      ))}
    </div>
  </div>
  )
}
