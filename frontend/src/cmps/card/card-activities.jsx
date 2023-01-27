import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { CardChangeBg } from "./card-preview/card-changeBg"
import { RxActivityLog } from "react-icons/rx"

export function CardActivites() {
  const modalRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
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
      {/* <section>
        <button className="grey-back" onClick={() => setIsEditing(!isEditing)}>{isEditing ? '<' : 'Change background'}</button>
        <h3>{isEditing ? 'Change background' : 'Menu'}</h3>
      </section>
      <div className="sep-line"></div> */}

      {isEditing && <CardChangeBg board={board} />}
      {!isEditing && (
        <div>
          <p className="activities-menu-title">Menu</p>
          <div className="sep-line"></div>
          <div className="activity-title">
            <span>
              <RxActivityLog />
            </span>
            <p className="activities-title">Activity</p>
          </div>
          <ul>
            {board.activities.map((activitie) => {
              // console.log(activitie)
              return (
                <li className="activitie" key={activitie.id}>
                  <div className="user-activitie-img">
                    <img src={activitie.userImage} />
                  </div>
                  <div className="user-activitie-info">
                    <p>
                      <b>{activitie.fullname}</b> {activitie.data}{" "}
                      {activitie.text}
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
      )}
    </div>
  )
}
