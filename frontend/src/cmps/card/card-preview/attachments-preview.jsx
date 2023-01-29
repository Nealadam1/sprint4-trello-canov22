import React from "react"
import { ImAttachment } from "react-icons/im"

export function AttachmentsPreview({ card }) {
  console.log(card)
  return (
    <div className="attachments-preview">
      <ImAttachment style={{ fontSize: "12px" }} />
      <span style={{ fontSize: "0.75rem" }}>{card?.attachments?.length}</span>
    </div>
  )
}
