import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export function CardActivites() {
  const modalRef = useRef(null)

  const board = useSelector((storeState) => storeState.boardModule.board)

  // const oneHourAgo = Date.now() - (60 * 60 * 1000);
  // const filteredActivities = activities.filter(activity => activity.createdAt > oneHourAgo);

  useEffect(() => {
    if (modalRef.current.scrollHeight > modalRef.current.clientHeight) {
      modalRef.current.style.overflowY = "scroll"
    }
  }, [board.activities.length])

  return (
    <div ref={modalRef} className="card-activites">
      <p className="activities-title">Activites</p>
      <div className="sep-line"></div>
      <ul>
        {board.activities.map((activitie) => {
          return (
            <li className="activitie">
              <div className="user-activitie-img">
                <img src={activitie.userImage} />
              </div>
              <div className="user-activitie-info">
                <p>
                  {activitie.fullname +
                    " " +
                    activitie.data +
                    " " +
                    activitie.text}
                </p>
                <span className="activitie-time">
                  {utilService.formatTime(activitie.createdAt)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
