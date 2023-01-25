import React from "react"
import { useSelector } from "react-redux"

export function BoardMembers() {
  const members = useSelector(
    (storeState) => storeState.boardModule.board.members
  )

  return (
    <div style={{ margin: "0" }} className="board-members">
      <div className="member-images">
        {members.map((member, idx) => (
          <img key={idx} className="member-image" alt="" src={member.imgUrl} />
        ))}
      </div>
    </div>
  )
}
