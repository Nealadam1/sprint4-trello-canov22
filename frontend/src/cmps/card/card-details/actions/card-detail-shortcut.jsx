import { useEffect, useRef } from "react"
import { useState } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { BsArchive, BsTag } from "react-icons/bs"
import { MdOutlineCreditCard } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  OpenActionModal,
  openCardDetail,
  setCardToStoreRef,
  setGroup,
  updateCard,
} from "../../../../store/actions/board.action"
import { DynamicActionModal } from "../../../dynamic-modal-cmp"
import { CardPreviewShortcut } from "../../card-preview-shortcut"

export function CardDetailsShortcut({ card, setEditCardShortcut, group }) {
  const boardId = useSelector((storeState) => storeState.boardModule.board._id)
  const [title, setTitle] = useState(card.title)
  const [currCard, setCurrCard] = useState(card)
  const [isUseRef, setIsUseRef] = useState(false)
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const cardRef = useRef(null)
  const buttonRefMembers = useRef(null)
  const buttonRefLabels = useRef(null)
  const buttonRefChecklist = useRef(null)
  const buttonRefCover = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      setIsUseRef(true)
    }
  }, [cardRef])

  setCardToStoreRef(currCard)
  setGroup(group)

  function handleSave() {
    const updatedCard = currCard
    updatedCard.title = title
    updateCard(updatedCard, "EDIT_CARD")
    setEditCardShortcut(null)
  }

  function handleOpenCard() {
    openCardDetail()
    setEditCardShortcut(null)
  }

  function handleArchive() {
    currCard.archivedAt = Date.now()
    updateCard(currCard, "ARCHIVED_CARD")
  }

  return (
    <section className="card-detail-shorcut" ref={cardRef}>
      <div className="card-detail-shortcut-menu">
        {isUseRef && (
          <DynamicMenuPosition cardRef={cardRef.current}>
            <ul className="shortcut-actions">
              <li>
                <Link
                  onClick={handleOpenCard}
                  to={`/board/${boardId}/${card.id}`}
                >
                  <span className="cover-icon side-bar-icon">
                    <MdOutlineCreditCard />
                  </span>{" "}
                  Open card
                </Link>
              </li>
              <li
                className="shortcut-menu-btn"
                ref={buttonRefLabels}
                onClick={
                  !isActionModal
                    ? (ev) => OpenActionModal(ev, "add-labels")
                    : null
                }
              >
                {isActionModal && (
                  <DynamicActionModal
                    card={currCard}
                    setCard={setCurrCard}
                    buttonRef={buttonRefLabels.current}
                    type={"add-labels"}
                  />
                )}
                <span className="labels-icon side-bar-icon">
                  <BsTag />
                </span>
                Edit labels
              </li>
              <li
                className="shortcut-menu-btn"
                ref={buttonRefMembers}
                onClick={
                  !isActionModal
                    ? (ev) => OpenActionModal(ev, "add-members")
                    : null
                }
              >
                {isActionModal && (
                  <DynamicActionModal
                    card={currCard}
                    setCard={setCurrCard}
                    buttonRef={buttonRefMembers.current}
                    type={"add-members"}
                  />
                )}
                <span className="memebers-icon side-bar-icon">
                  <AiOutlineUser />
                </span>
                Change members
              </li>
              <li
                className="shortcut-menu-btn"
                ref={buttonRefCover}
                onClick={
                  !isActionModal
                    ? (ev) => OpenActionModal(ev, "add-cover")
                    : null
                }
              >
                {isActionModal && (
                  <DynamicActionModal
                    card={currCard}
                    setCard={setCurrCard}
                    buttonRef={buttonRefCover.current}
                    type={"add-cover"}
                  />
                )}
                <span className="cover-icon side-bar-icon">
                  <MdOutlineCreditCard />
                </span>
                Cover Change cover
              </li>
              <li>Move</li>
              <li>Copy</li>
              <li onClick={handleArchive}>
                <span className="archive-icon side-bar-icon">
                  <BsArchive />
                </span>
                Archive
              </li>
            </ul>
          </DynamicMenuPosition>
        )}
      </div>

      <div>
        <CardPreviewShortcut
          card={currCard}
          title={title}
          setTitle={setTitle}
        />
      </div>

      <div className="card-detail-shorcut-save ">
        <button className="blue-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  )
}

const DynamicMenuPosition = (props) => {
  const { cardRef } = props
  const modalRef = useRef(null)
  const [modalStyles, setModalStyles] = useState({
    position: "fixed",
    top: `calc(${cardRef.getBoundingClientRect().top}px`,
    left: `calc(${cardRef.getBoundingClientRect().left}px + ${
      cardRef.offsetWidth
    }px)`,
    width: "140px",
  })

  useEffect(() => {
    if (
      modalRef.current &&
      modalRef.current.getBoundingClientRect().bottom > window.innerHeight
    ) {
      setModalStyles({
        ...modalStyles,
        top: `calc(${cardRef.getBoundingClientRect().top}px - ${
          modalRef.current.offsetHeight / 1.5
        }px)`,
      })
    }

    if (
      modalRef.current &&
      modalRef.current.getBoundingClientRect().right > window.innerWidth
    ) {
      setModalStyles({
        ...modalStyles,
        left: `calc(${cardRef.getBoundingClientRect().left}px - ${
          modalRef.current.offsetWidth
        }px)`,
      })
    }
  }, [modalRef, cardRef])

  return (
    <section ref={modalRef} style={modalStyles}>
      {props.children}
    </section>
  )
}
