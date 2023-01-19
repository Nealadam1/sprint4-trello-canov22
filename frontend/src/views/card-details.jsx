import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
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
export function CardDetails() {
  const [card, setCard] = useState(null)
  const navigate = useNavigate()

  const board = useSelector((storeState) => storeState.boardModule.board)
  const modal = useSelector(
    (storeState) => storeState.systemModule.cardDetailModal
  )
  const { cardId } = useParams()

  useEffect(() => {
    const currCard = getCardById(board, cardId)
    setCard(currCard)
  }, [cardId])

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      closeCardDetail()
      window.removeEventListener("click", () => {
        handleClose()
      })
    }
    navigate(`/board/${board._id}`)
  }

  console.log(card)

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
              <CardDetailsSidebar />
            </div>
            <div className="card-content">
              <h2 className="card-title">
                <span>
                  <FontAwesomeIcon icon={faWindowMaximize} />
                </span>
                {card?.title}
              </h2>
              <div className="card-detail-data">
                {card?.byMember && <CardMember />}
                {card?.labelIds && <CardLabels />}
              </div>
              <div>{card?.description && <CardDescription />}</div>
              <div>{card?.checklists && <CardChecklists />}</div>
              <div>{card?.comments && <CardComments />}</div> */
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
