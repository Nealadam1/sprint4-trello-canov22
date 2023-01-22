import React, { useRef, useState } from "react"
import { useEffect } from "react"
import { createDispatchHook, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  closeCardDetail,
  getCardById,
  OpenActionModal,
  setCardToStoreRef,
} from "../store/actions/board.action"
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons"

import { CardDetailsSidebar } from "../cmps/card/card-details/card-details-sidebar"
import { CardMember } from "../cmps/card/card-details/card-member"
import { CardLabels } from "../cmps/card/card-details/card-labels"
import { CardDescription } from "../cmps/card/card-details/card-description"
import { CardChecklists } from "../cmps/card/card-details/card-checklists"
import { CardComments } from "../cmps/card/card-details/card-comments"
import { closeActionModal } from "../store/actions/board.action"
import { store } from "../store/store"
import { DynamicActionModal } from "../cmps/dynamic-modal-cmp"
import { AiOutlinePlus } from "react-icons/ai"

export function CardDetails() {
  const [card, setCard] = useState(null)
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

  useEffect(() => {
    const currCard = getCardById(board, cardId)
    setCard(currCard)
    setCardToStoreRef(currCard)
    if (isActionModal) closeActionModal()
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
          }}
          onClick={handleClose}
        >
          <div className="card-details">
            {card && card.style && (
              <header
                className="card-header"
                style={{
                  background: card?.style ? card?.style?.bgColor : "fff",
                }}
              ></header>
            )}
            <div className="side-bar">
              <CardDetailsSidebar setCard={setCard} card={card} />
            </div>
            <div className="card-content">
              <h3 className="card-title">
                <span className="card-icon-title">
                  <FontAwesomeIcon icon={faWindowMaximize} />
                </span>
                {card?.title}
              </h3>

              <p className="card-details-group-title">
                In list <span>{store.getState().boardModule.group.title}</span>
              </p>
              <div className="card-detail-data">
                {card?.memberIds && (
                  <CardMember
                    setCard={setCard}
                    members={card.memberIds}
                    card={card}
                  />
                )}
                {card?.labelIds && (
                  <div>
                    <span className="card-details-labels-title">Labels</span>
                    <div className="card-details-label-container">
                      <CardLabels card={card} cardLabels={card.labelIds} />
                      <div className="grey-button" ref={buttonRefLabelAction}
                        onClick={
                          !isActionModal
                            ? (ev) => OpenActionModal(ev, "add-labels2")
                            : null
                        }>

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
                {card?.checklists && (
                  <CardChecklists
                    checklists={card.checklists}
                    card={card}
                    setCard={setCard}
                  />
                )}
              </div>
              <div>
                {card?.comments && <CardComments comments={card.comments} />}
              </div>
              <button onClick={handleClose}>
                <Link to={`/board/${board._id}`}>Close</Link>
              </button>
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
