import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addMember, removeMember } from "../../../../store/actions/board.action"
import { FiCheck } from "react-icons/fi"

export function MemberAction({ card, setCard }) {
  const board = useSelector((storeState) => storeState.boardModule.board)

  function onAddMember(memberId) {
    const updatedMembers = card.memberIds
      ? [...card.memberIds, memberId]
      : [memberId]

    if (card?.memberIds?.find((member) => member === memberId)) {
      const updatedMemberIds = card.memberIds.filter(
        (member) => member !== memberId
      )
      removeMember(updatedMemberIds, card)
      setCard({ ...card, memberIds: updatedMemberIds })
      return
    }
    addMember(memberId, card)
    setCard({ ...card, memberIds: updatedMembers })
  }

  return (
    <div className="members-list">
      <p className="members-list-title">Members</p>
      <div className="sep-line"></div>
      <ul className="members-preview">
        {board.members?.map((member, idx) => (
          <div className="members-action-container">
            <div className="members-action-info">
              <li key={idx} onClick={() => onAddMember(member._id)}>
                <img className="member-image" src={member.imgUrl} />
                {member.fullname}
              </li>
            </div>
            <div className="members-action-detail">
              {card.memberIds?.includes(member._id) && (
                <span>
                  <FiCheck />
                </span>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
