import React, { useEffect, useState } from "react"
import { LabelPreview } from "./card-preview/label-preview"
import { MemberPreview } from "./card-preview/member-preview"
import { Draggable } from "react-beautiful-dnd"
import { DatePreview } from "./card-preview/date-preview"
import { ChecklistPreview } from "./card-preview/checklist-preview"
import {
  socketService,
  SOCKET_EVENT_UPDATE_CARD,
} from "../../services/socket.service"
import { Card } from "@mui/material"
import { AttachmentsPreview } from "./card-preview/attachments-preview"
import { CommentsPreview } from "./card-preview/comments-preview"

export function CardPreview({ card, idx }) {

  useEffect(() => {
    // socketService.on(SOCKET_EVENT_UPDATE_CARD)
  }, [])

  function displayHeader(card) {
    if (card?.attachments[0]?.imgUrl) {
      card.style = { bgColor: "#fffff" }
      return {
        backgroundImage: `url(${card?.attachments[0]?.imgUrl})`,
        objectFit: "fill",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100px",
      }
    } else if (card?.attachments[0]?.link) {
      card.style = { bgColor: "#fffff" }
      return {
        backgroundImage: `url(${card?.attachments[0]?.link})`,
        objectFit: "fill",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100px",
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
    <div className="card-preview">
      {card?.style?.bgColor ? (
        <header
          className="card-header"
          // style={{ backgroundColor: card.style.bgColor }}
          style={displayHeader(card)}
        ></header>
      ) : null}
      <div className="card-info">
        {card?.labelIds && <LabelPreview labels={card.labelIds} />}
        <p>{card.title}</p>
        <div className="card-details-preview">
          <div className="card-preview-left-icons">
            {card?.dueDate && <DatePreview date={card.dueDate} />}
            {card?.attachments && card.attachments.length > 0 && (
              <AttachmentsPreview card={card} />
            )}
            {card?.checklists && card.checklists.length > 0 && (
              <ChecklistPreview card={card} />
            )}
            {card?.comments && card.comments.length > 0 && (
              <CommentsPreview card={card} />
            )}
          </div>
          {card?.memberIds && card.memberIds.length > 0 && (
            <MemberPreview card={card} />
          )}
        </div>
      </div>
    </div>
  )
}
