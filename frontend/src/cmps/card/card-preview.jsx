import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function CardPreview({ card }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [currMembers, setCurrMembers] = useState([])

  useEffect(() => {
    loadMembers()
  }, [card.memberIds])

  function loadMembers() {
    if (!card.memberIds) return
    let cardMembers = board.members.filter((member) =>
      card.memberIds.includes(member._id)
    )
    setCurrMembers(cardMembers)
  }

  return (
    <div className="card-preview">
      <p>{card.title}</p>
      <div className="member-images">
        {currMembers.map((member) => (
          <img className="member-image" alt="" src={member.imgUrl} />
        ))}
      </div>
    </div>
  )
}
