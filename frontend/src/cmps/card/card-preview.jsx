import React, { useEffect, useState } from "react"
import { LabelPreview } from "./card-preview/label-preview"
import { MemberPreview } from "./card-preview/member-preview"
import { Draggable } from "react-beautiful-dnd"
import { DatePreview } from "./card-preview/date-preview"
import { ChecklistPreview } from "./card-preview/checklist-preview"

export function CardPreview({ card, idx }) {

  return (
    <div className="card-preview">
      {card?.style?.bgColor ? (
        <header
          className="card-header"
          style={{ backgroundColor: card.style.bgColor }}
        ></header>
      ) : null}
      <div className="card-info">
        {card?.labelIds && <LabelPreview labels={card.labelIds} />}
        <p>{card.title}</p>
        <div className="card-details-preview">
          <div className="card-preview-left-icons">
            {card?.dueDate && <DatePreview date={card.dueDate} />}
            {card?.checklists && card.checklists.length > 0 && (
              <ChecklistPreview card={card} />
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
