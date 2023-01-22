import { useRef, useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { AiOutlinePlus } from "react-icons/ai"
import {
  closeActionModal,
  OpenActionModal,
} from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"

export function CardMember({ members, card, setCard }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [currMembers, setCurrMembers] = useState([])
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const buttonRef = useRef(null)

  useEffect(() => {
    loadMembers()
  }, [members])

  function loadMembers() {
    if (!members) return
    let cardMembers = board.members.filter((member) =>
      members.includes(member._id)
    )
    setCurrMembers(cardMembers)
  }
  return (
    <article>
      <span className="members-span">Members</span>
      <div className="card-member">
        {currMembers.map((member) => (
          <img key={member._id} className="member-image" src={member.imgUrl} />
        ))}
        <button
          ref={buttonRef}
          onClick={
            !isActionModal
              ? (ev) => OpenActionModal(ev, "add-members2")
              : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              setCard={setCard}
              buttonRef={buttonRef.current}
              type={"add-members2"}
            />
          )}
          <AiOutlinePlus />
        </button>
      </div>
    </article>
  )
}
