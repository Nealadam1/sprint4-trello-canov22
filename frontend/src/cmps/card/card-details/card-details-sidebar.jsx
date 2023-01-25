import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  closeActionModal,
  closeCardDetail,
  OpenActionModal,
  updateCard,
} from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"
import { BsTag } from "react-icons/bs"
import { IoMdCheckboxOutline } from "react-icons/io"
import { AiOutlineClockCircle, AiOutlineUser } from "react-icons/ai"
import { MdOutlineCreditCard } from "react-icons/md"
import { CardDetailsShortcut } from "./actions/card-detail-shortcut"
import { GrAttachment } from "react-icons/gr"
import { BsArrowRight, BsArchive } from "react-icons/bs"
import { useNavigate } from "react-router-dom"


export function CardDetailsSidebar({ card, setCard }) {
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const navigate = useNavigate()
  const buttonRefMembers = useRef(null)
  const buttonRefLabels = useRef(null)
  const buttonRefChecklist = useRef(null)
  const buttonRefCover = useRef(null)
  const buttonRefDates = useRef(null)
  const buttonRefAttachment = useRef(null)
  const buttonRefMoveCard = useRef(null)

  function handleArchive() {
    card.archivedAt = Date.now()
    updateCard(card, "ARCHIVED_CARD")
    closeCardDetail()
  }

  return (
    <aside className="card-details-sidebar">
      <div>
        <span className="side-bar-action-title">Add to card</span>
        <button
          className="side-bar-btn"
          ref={buttonRefMembers}
          onClick={
            !isActionModal ? (ev) => OpenActionModal(ev, "add-members") : null
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
            !isActionModal ? (ev) => OpenActionModal(ev, "add-labels") : null
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
            !isActionModal ? (ev) => OpenActionModal(ev, "add-checklist") : null
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
            !isActionModal ? (ev) => OpenActionModal(ev, "add-cover") : null
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
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRefDates}
          onClick={
            !isActionModal ? (ev) => OpenActionModal(ev, "add-date") : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRefDates.current}
              type={"add-date"}
              setCard={setCard}
            />
          )}
          <span className="checklist-icon side-bar-icon">
            <AiOutlineClockCircle />
          </span>
          Date
        </button>
      </div>
      <div>
        <button
          className="side-bar-btn"
          ref={buttonRefAttachment}
          onClick={
            !isActionModal ? (ev) => OpenActionModal(ev, "add-attachment") : null
          }
        >
          {isActionModal && (
            <DynamicActionModal
              card={card}
              buttonRef={buttonRefAttachment.current}
              type={"add-attachment"}
              setCard={setCard}
            />
          )}
          <span className="checklist-icon side-bar-icon">
            <GrAttachment />
          </span>
          Attachment
        </button>
      </div>
      <div>
        <span className="side-bar-action-title">Actions</span>
        <div>
          <button
            className="side-bar-btn"
            ref={buttonRefMoveCard}
            onClick={
              !isActionModal ? (ev) => OpenActionModal(ev, "move-card") : null
            }
          >
            {isActionModal && (
              <DynamicActionModal
                card={card}
                buttonRef={buttonRefMoveCard.current}
                type={"move-card"}
                setCard={setCard}
              />
            )}
            <span className="checklist-icon side-bar-icon">
              <BsArrowRight />
            </span>
            Move
          </button>
        </div>
        <button className="side-bar-btn" onClick={handleArchive}>
          <span className="archive-icon side-bar-icon">
            <BsArchive />
          </span>
          Archive
        </button>
      </div>
    </aside>
  )
}
