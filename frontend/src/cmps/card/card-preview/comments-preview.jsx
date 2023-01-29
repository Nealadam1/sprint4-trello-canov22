import { Card } from "@mui/material"
import React from "react"
import { FaRegComment } from "react-icons/fa"

export function CommentsPreview({ card }) {
  return (
    <div className="comments-preview">
      <FaRegComment style={{ fontSize: "12px" }} />
      <span style={{ fontSize: "12px" }}>{card?.comments.length}</span>
    </div>
  )
}
