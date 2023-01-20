import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { OpenActionModal } from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"

export function CardDetailsSidebar({ card }) {
  const isActionModal = useSelector((storeState) => storeState.systemModule.isActionModal)
  const dynmOpenModal = !isActionModal ? OpenActionModal : null
  const buttonRef = useRef(null)
  return (
    <aside className="card-details-sidebar">
      <div>
        <button ref={buttonRef} onClick={dynmOpenModal} >
          {isActionModal &&(<DynamicActionModal
            card={card}
            buttonRef={buttonRef.current}
            type={"add-members"}
          />)}
        </button>
      </div>
    </aside>
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
