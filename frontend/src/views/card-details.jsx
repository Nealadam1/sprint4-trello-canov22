import React, { useState } from "react"
import { useEffect } from "react"
import { createDispatchHook, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { closeCardDetail, getCardById } from "../store/actions/board.action"
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons"

import { CardDetailsSidebar } from "../cmps/card/card-details/card-details-sidebar"
import { CardMember } from "../cmps/card/card-details/card-member"
import { CardLabels } from "../cmps/card/card-details/card-labels"
import { CardDescription } from "../cmps/card/card-details/card-description"
import { CardChecklists } from "../cmps/card/card-details/card-checklists"
import { CardComments } from "../cmps/card/card-details/card-comments"
import { CloseActionModal } from "../store/actions/board.action"

export function CardDetails() {
  const [card, setCard] = useState(null)
  const navigate = useNavigate()

  const board = useSelector((storeState) => storeState.boardModule.board)
  const modal = useSelector(
    (storeState) => storeState.systemModule.cardDetailModal
  )
  const actionModal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  const { cardId } = useParams()

  useEffect(() => {
    const currCard = getCardById(board, cardId)
    setCard(currCard)
    if (actionModal) CloseActionModal()
  }, [cardId])

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      closeCardDetail()
      navigate(`/board/${board._id}`)
      window.removeEventListener("click", () => {
        handleClose()
      })
    }
  }

  return (
    <div>
      {/* <button onClick={handleOpen}>Open Modal</button> */}
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
              <div className="card-detail-data">
                {card?.memberIds && (
                  <CardMember members={card.memberIds} card={card} />
                )}
                {card?.labelIds && <CardLabels cardLabels={card.labelIds} />}
              </div>
              <div>
                {card && (
                  <CardDescription description={card.description} />
                )}
              </div>
              <div>
                {card?.checklists && (
                  <CardChecklists checklists={card.checklists} />
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
