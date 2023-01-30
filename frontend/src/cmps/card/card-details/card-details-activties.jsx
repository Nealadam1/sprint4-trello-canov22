import React, { useEffect, useState } from "react"
import { utilService } from "../../../services/util.service"

export const CardActivites = ({ card, board }) => {
  const [cardActivities, setCardActivities] = useState([])
  useEffect(() => {
    loadActivites()
  }, [])

  function loadActivites() {
    setCardActivities(
      board.activities.filter((activity) => activity.cardId === card.id)
    )
  }

  return (
    <ul className="card-activites">
      {cardActivities.map((activity) => {
        return (
          <li className="activitie" key={activity.id}>
            <div className="user-activitie-img">
              <img style={{ width: "31.5px" }} src={activity.userImage} />
            </div>
            <div className="user-activitie-info">
              <p>
                <b>{activity.fullname}</b> <span>{activity.data} </span>
                <span> {activity.text}</span>
              </p>
              <span className="activitie-time">
                {utilService.formatTime(activity.createdAt)}
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
