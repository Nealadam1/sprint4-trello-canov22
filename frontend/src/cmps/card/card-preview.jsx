import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { MemberPreview } from "./card-preview/member-preview"

export function CardPreview({ card }) {
  // console.log(card.labelIds);
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
      {card?.style?.bgColor ? (
        <header
          className="card-header"
          style={{ backgroundColor: card.style.bgColor }}
        ></header>
      ) : null}

      <div className="card-info">
        {card?.labelIds ? card.labelIds.map((label) => label) : ""}
        <p>{card.title}</p>
        <MemberPreview members={currMembers} />
      </div>
    </div>
  )
}
