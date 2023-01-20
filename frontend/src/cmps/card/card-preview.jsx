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
  console.log(card)

  return (
    <div className="card-preview">
      {card?.style?.bgColor ? (
        <header
          className="card-header"
          style={{
            backgroundColor: card.style.bgColor,
            width: "100%",
            height: "32px",
          }}
        ></header>
      ) : null}
      <p>{card.title}</p>
      <div className="member-images">
        {currMembers.map((member) => (
          <img className="member-image" alt="" src={member.imgUrl} />
        ))}
      </div>
    </div>
  )
}
