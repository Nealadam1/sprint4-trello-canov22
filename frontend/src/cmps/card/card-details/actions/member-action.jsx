import { useState } from "react"
import { useSelector } from "react-redux"

export function MemberAction({ card }) {
  const [showMembers, setShowMembers] = useState(false)

  const board = useSelector((storeState) => storeState.boardModule.board)
  const group = useSelector((storeState) => storeState.boardModule.group)

  function onAddMember(memberId) {
    console.log(memberId)

    //   onAddMember(memberId, card)
    // if (card.memberIds.find((member) => member === memberId)) {
    //   return card.memberIds.filter((member) => member !== memberId)
    // }
    // const updatedMembers = [...card.memberIds, memberId]
    // console.log(group)
  }

  return (
    <div className="card-details-sidebar">
      <button onClick={() => setShowMembers((prev) => !prev)}>Members</button>
      {showMembers && (
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
      )}
    </div>
  )
}
