import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LabelPreview } from "./card-preview/label-preview"
import { MemberPreview } from "./card-preview/member-preview"
import { Draggable } from "react-beautiful-dnd"
import { DatePreview } from "./card-preview/date-preview"
import { ChecklistPreview } from "./card-preview/checklist-preview"

export function CardPreview({ card, idx }) {
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
      {/* // ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}> */}
      <div className="card-preview">
        {card?.style?.bgColor ? (
          <header
            className="card-header"
            style={{ backgroundColor: card.style.bgColor }}
          ></header>
        ) : null}
        <div className="card-info">
          {card?.labelIds && <LabelPreview labels={card.labelIds} />}
          <p>{card.title}</p>
          <div className="card-details-preview">
            <div className="card-preview-left-icons">
              {card?.dueDate && <DatePreview date={card.dueDate} />}
              {card?.checklists && <ChecklistPreview card={card} />}
            </div>
            {card?.memberIds && <MemberPreview members={currMembers} />}
          </div>
        </div>
      </div>
    </div>
  )
}
