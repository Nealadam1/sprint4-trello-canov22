import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { createDispatchHook, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { store } from "../store/store"
import { AiOutlinePlus } from "react-icons/ai"
import { RxActivityLog } from "react-icons/rx"

import { closeActionModal } from "../store/actions/board.action"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  closeCardDetail,
  getCardById,
  OpenActionModal,
  setCardToStoreRef,
  updateCard,
} from "../store/actions/board.action"
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons"

import { CardDetailsSidebar } from "../cmps/card/card-details/card-details-sidebar"
import { CardMember } from "../cmps/card/card-details/card-member"
import { CardLabels } from "../cmps/card/card-details/card-labels"
import { CardDescription } from "../cmps/card/card-details/card-description"
import { CardChecklists } from "../cmps/card/card-details/card-checklists"
import { CardComments } from "../cmps/card/card-details/card-comments"
import { CardActivites } from "../cmps/card/card-details/card-details-activties"
import { DynamicActionModal } from "../cmps/dynamic-modal-cmp"
import { CardDate } from "../cmps/card/card-details/card-date"
import { CardAttachments } from "../cmps/card/card-details/card-attachments"
import { CgClose } from "react-icons/cg"
import {
  socketService,
  SOCKET_EMIT_UPDATE_CARD,
  SOCKET_EVENT_UPDATE_CARD,
} from "../services/socket.service"

export function CardDetails() {
  const [card, setCard] = useState(null)
  const [showActivities, setShowActivities] = useState(false)
  const [cardTitle, setCardTitle] = useState("")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const navigate = useNavigate()
  const board = useSelector((storeState) => storeState.boardModule.board)
  const modal = useSelector(
    (storeState) => storeState.systemModule.cardDetailModal
  )
  const isActionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const { cardId } = useParams()
  const buttonRefLabelAction = useRef(null)
  const inputRef = useRef(null)
  const cardTitleRef = useRef(null)

  useEffect(() => {
    socketService.on(SOCKET_EVENT_UPDATE_CARD, (ans) => {
      setCard({ ...card })
    })

    return () => {
      // socketService.off(SOCKET_EVENT_UPDATE_CARD)
    }
  }, [])

  useEffect(() => {
    if (isEditingTitle) {
      inputRef?.current?.focus()
    }
  }, [isEditingTitle])

  useEffect(() => {
    const currCard = getCardById(board, cardId)
    // if (!card?.comments.length) currCard.comments = []
    setCard(currCard)
    setCardTitle(currCard.title)
    setCardToStoreRef(currCard)
    if (isActionModal) closeActionModal()
    socketService.on(SOCKET_EVENT_UPDATE_CARD, (ans) => {
      setCard({ ...card })
    })
  }, [cardId])

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      closeCardDetail()
      closeActionModal()
      navigate(`/board/${board._id}`)
      window.removeEventListener("click", () => {
        handleClose()
      })
    }
  }

  function handleTitleChange({ target }) {
    setCardTitle(target.value)
  }

  function handleBlur(ev) {
    if (!ev.target.value) {
      ev.preventDefault()
      return
    } else {
      handleTitleSave()
    }
  }

  // function setCardHeader() {
  // // imgURL >> LINK >>> COLOR
  //   if(card?.attachments) {
  //     return
  //   }
  // }

  function handleTitleSave() {
    card.title = cardTitle
    updateCard(card)
    setIsEditingTitle(false)
    // socketService.emit(SOCKET_EMIT_UPDATE_CARD, { ...card })
  }

  function displayHeader(card) {
    if (card?.attachments && card.attachments[0]?.imgUrl) {
      card.style = { bgColor: "#fffff" }
      return {
        backgroundImage: card?.attachments
          ? `url(${card?.attachments[0]?.imgUrl})`
          : "fff",
        objectFit: "fill",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }
    } else if (card?.attachments && card.attachments[0]?.link) {
      card.style = { bgColor: "#fff" }
      return {
        backgroundImage: card?.attachments
          ? `url(${card?.attachments[0]?.link})`
          : "fff",
        objectFit: "fill",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "auto",
      }
    } else if (card?.style?.bgColor) {
      return {
        background: card?.style ? card?.style?.bgColor : "fff",
        borderRadius: "3px 3px 0 0",
      }
    }
    // console.log(card);
    // imgURL >> LINK >>> COLOR
  }

  return (
    <div>
      {modal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
          onClick={handleClose}
        >
          <div
            style={{
              gridTemplateAreas: card?.style?.bgColor
                ? `"header  header  header"
                   "content content side-bar"`
                : `"content content side-bar"
                   "content content side-bar"`,
            }}
            className="card-details"
          >
            {(card || card?.attachments[0] || card?.style) && (
              <header className="card-header" style={displayHeader(card)}>
                {/* {card.style ? <button onClick={handleClose}>
                  <Link to={`/board/${board._id}`}>x</Link>
                </button> : ''} */}
              </header>
            )}
            <button onClick={handleClose} className="close-card-detail">
              <Link to={`/board/${board._id}`}>
                <i>
                  <CgClose />
                </i>
              </Link>
            </button>

            <div className="side-bar">
              <CardDetailsSidebar setCard={setCard} card={card} board={board} />
            </div>

            <div className="card-content">
              {isEditingTitle ? (
                <h3 className="card-title">
                  <span className="card-icon-title">
                    <FontAwesomeIcon icon={faWindowMaximize} />
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="card-title-input"
                    value={cardTitle}
                    onChange={handleTitleChange}
                    onBlur={handleBlur}
                    required
                  />
                </h3>
              ) : (
                <h3 className="card-title">
                  <span className="card-icon-title">
                    <FontAwesomeIcon icon={faWindowMaximize} />
                  </span>
                  <h3
                    className="card-title"
                    ref={cardTitleRef}
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {cardTitle}
                  </h3>
                </h3>
              )}

              <p className="card-details-group-title">
                In list{" "}
                <span>{store.getState().boardModule?.group?.title}</span>
              </p>

              <div className="card-detail-data">
                {card?.memberIds && (
                  <CardMember
                    setCard={setCard}
                    members={card.memberIds}
                    card={card}
                  />
                )}

                {card?.dueDate && <CardDate date={card?.dueDate} />}

                {card?.labelIds?.length > 0 && (
                  <div>
                    <span className="card-details-labels-title">Labels</span>
                    <div className="card-details-label-container">
                      <CardLabels
                        setCard={setCard}
                        card={card}
                        cardLabelIds={card.labelIds}
                      />
                      <div
                        className="grey-button card-details-add-labels"
                        ref={buttonRefLabelAction}
                        onClick={
                          !isActionModal
                            ? (ev) => OpenActionModal(ev, "add-labels2")
                            : null
                        }
                      >
                        {isActionModal && (
                          <DynamicActionModal
                            card={card}
                            buttonRef={buttonRefLabelAction.current}
                            type={"add-labels2"}
                          />
                        )}
                        <AiOutlinePlus />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>{card && <CardDescription card={card} />}</div>
              <div>
                {card?.attachments && card?.attachments?.length > 0 && (
                  <CardAttachments card={card} />
                )}
              </div>
              <div>
                {card?.checklists && (
                  <CardChecklists
                    checklists={card.checklists}
                    card={card}
                    setCard={setCard}
                  />
                )}
              </div>
              <div className="card-comments-title">
                <div className="activity-title">
                  <span className="comments-icon">
                    <RxActivityLog />
                  </span>
                  <h3>Activity</h3>
                </div>
                <div className="activity-btn">
                  {showActivities ? (
                    <button
                      onClick={() => setShowActivities(!showActivities)}
                      className="grey-button"
                    >
                      Hide details
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowActivities(!showActivities)}
                      className="grey-button"
                    >
                      Show details
                    </button>
                  )}
                </div>
              </div>
              <div>
                {card?.comments && (
                  <CardComments card={card} setCard={setCard} />
                )}
              </div>
              {showActivities && <CardActivites card={card} board={board} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

//   return (
//     <div className="card-details">
//       {cardId ? (
//         <div>
//           <header style={{ background: card.style.bgColor }}></header>
//           <h4>{card.title}</h4>
//           <h5>{card.description}</h5>
//           <p>{card.checklist}</p>
//         </div>
//       ) : null}
//     </div>
//   )
// }
