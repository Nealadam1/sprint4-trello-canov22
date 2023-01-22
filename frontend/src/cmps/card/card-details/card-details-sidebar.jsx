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
import {MdOutlineCreditCard} from "react-icons/md"

export function CardDetailsSidebar({ card, setCard }) {
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const buttonRefMembers = useRef(null)
  const buttonRefLabels = useRef(null)
  const buttonRefChecklist = useRef(null)
  const buttonRefCover = useRef(null)
  return (
    <aside className="card-details-sidebar">
      <div>
        <span className="side-bar-action-title">Add to card</span>
        <button
          className="side-bar-btn"
          ref={buttonRefMembers}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-members")
              : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              setCard={setCard}
              buttonRef={buttonRefMembers.current}
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
          className="side-bar-btn"
          ref={buttonRefLabels}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-labels")
              : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRefLabels.current}
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
          ref={buttonRefChecklist}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-checklist")
              : null
          }
          
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRefChecklist.current}
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
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRefCover}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-cover")
              : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRefCover.current}
              type={"add-cover"}
              setCard={setCard}
            />
          )}
          <span className="checklist-icon side-bar-icon">
            <MdOutlineCreditCard />
          </span>
          Cover
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
