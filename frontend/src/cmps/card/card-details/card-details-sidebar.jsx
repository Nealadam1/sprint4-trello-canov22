import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  closeActionModal,
  OpenActionModal,
} from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CardDetailsSidebar({ card, setCard }) {
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const buttonRef = useRef(null)
  return (
    <aside className="card-details-sidebar">
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRef}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-members")
              : closeActionModal
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              setCard={setCard}
              buttonRef={buttonRef.current}
              type={"add-members"}
            />
          )}
          <FontAwesomeIcon icon={faUser} />
          Members
        </button>
      </div>
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRef}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-labels")
              : closeActionModal
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRef.current}
              type={"add-labels"}
            />
          )}
          <FontAwesomeIcon icon={faUser} />
          Labels
        </button>
      </div>
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRef}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-checklist")
              : closeActionModal
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRef.current}
              type={"add-checklist"}
            />
          )}
          <FontAwesomeIcon icon={faUser} />
          Checklist
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
