import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  closeActionModal,
  OpenActionModal,
} from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"
import { BsTag } from "react-icons/bs"
import { IoMdCheckboxOutline } from "react-icons/io"
import { AiOutlineUser } from "react-icons/ai"

export function CardDetailsSidebar({ card, setCard }) {
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const buttonRef = useRef(null)
  return (
    <aside className="card-details-sidebar">
      <div>
        <span className="side-bar-action-title">Add to card</span>
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
          <span className="memebers-icon side-bar-icon">
            <AiOutlineUser />
          </span>
          Members
        </button>
      </div>
      <div>
        <button
          className="side-bar-btn "
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
          <span className="labels-icon side-bar-icon">
            <BsTag />
          </span>
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
              setCard={setCard}
            />
          )}
          <span className="checklist-icon side-bar-icon">
            <IoMdCheckboxOutline />
          </span>
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
