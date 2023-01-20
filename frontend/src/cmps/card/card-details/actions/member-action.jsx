import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addMember, removeMember } from "../../../../store/actions/board.action"

export function MemberAction({ card }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const group = useSelector((storeState) => storeState.boardModule.group)

  function onAddMember(memberId) {
    if (card?.memberIds?.find((member) => member === memberId)) {
      const updatedMemberIds = card.memberIds.filter(
        (member) => member !== memberId
      )
      return removeMember(updatedMemberIds, card)
    }
    addMember(memberId, card)
  }

  return (
        <div className="members-list">
          <ul>
            {board.members.map((member) => (
              <li onClick={() => onAddMember(member._id)}>
                <img className="member-image" src={member.imgUrl} />
                {member.fullname}
              </li>
            ))}
          </ul>
        </div>
  )
}
