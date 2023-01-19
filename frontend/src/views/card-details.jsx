import React, { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import {
  closeCardDetail,
  getCardById,
  openCardDetail,
} from "../store/actions/board.action"

export function CardDetails() {
  const [card, setCard] = useState(null)

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

      window.removeEventListener("click", handleClose)
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
          <Link to={`/board/${board._id}`}>
            <div className="card-details">
              {card && card.style && (
                <header
                  className="card-header"
                  style={{
                    background: card?.style ? card?.style?.bgColor : "fff",
                  }}
                ></header>
              )}
              <div className="card-content">
                <h1>{card?.title}</h1>
                <p>{card?.description}</p>
                <ul>
                  {card &&
                    card.checklists &&
                    card?.checklists?.map((checklist) => {
                      return (
                        <div>
                          <h3>{checklist.title}</h3>
                          <ul>
                            {checklist.todos.map((todo) => (
                              <li>{todo.title}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                </ul>

                <button onClick={handleClose}>
                  <Link to={`/board/${board._id}`}>Close</Link>
                </button>
              </div>
            </div>
          </Link>
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
