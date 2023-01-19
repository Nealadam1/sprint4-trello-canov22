import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { DynamicActionModal } from "../../dynamic-modal-cmp"

export function CardDetailsSidebar({ card }) {
  const buttonRef = useRef(null)
  return (
    <div>
      <button ref={buttonRef}>
        <DynamicActionModal
          card={card}
          buttonRef={buttonRef.current}
          type={"add-members"}
        />
      </button>
    </div>
  )

  // const [showMembers, setShowMembers] = useState(false)

  // const board = useSelector((storeState) => storeState.boardModule.board)

  // function addMember(memberId) {
  //   if (card.memberIds.find((member) => member === memberId)) {
  //     return card.memberIds.filter((member) => member !== memberId)
  //   }
  //   const updatedCard = [...card.memberIds, memberId]
  // }

  // return (
  //   <div className="card-details-sidebar">
  //     <button onClick={() => setShowMembers((prev) => !prev)}>Members</button>
  //     {showMembers && (
  //       <div className="members-list">
  //         <ul>
  //           {board.members.map((member) => (
  //             <li onClick={() => addMember(member._id)}>
  //               <img className="member-image" src={member.imgUrl} />
  //               {member.fullname}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // )
}
