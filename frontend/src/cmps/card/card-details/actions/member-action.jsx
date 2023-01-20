import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addMember, removeMember } from "../../../../store/actions/board.action"

export function MemberAction({ card, setCard }) {
  const board = useSelector((storeState) => storeState.boardModule.board)

  function onAddMember(memberId) {
    const updatedMembers = card.memberIds
      ? [...card.memberIds, memberId]
      : [memberId]
    console.log(card.memberIds)

    if (card?.memberIds?.find((member) => member === memberId)) {
      const updatedMemberIds = card.memberIds.filter(
        (member) => member !== memberId
      )
      console.log(updatedMemberIds)
      removeMember(updatedMemberIds, card)
      setCard({ ...card, memberIds: updatedMemberIds })
      return
    }
    addMember(memberId, card)
    setCard({ ...card, memberIds: updatedMembers })
  }

  return (
    <div className="members-list">
      <ul>
        {board.members?.map((member, idx) => (
          <li key={idx} onClick={() => onAddMember(member._id)}>
            <img className="member-image" src={member.imgUrl} />
            {member.fullname}
          </li>
        ))}
      </ul>
    </div>
  )
}
