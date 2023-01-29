import React, { useState } from "react"
import { useSelector } from "react-redux"

export function BoardBackground() {
  const [openBackgroundModal, setOpenBackgroundModal] = useState(false)
  const board = useSelector((storeState) => storeState.boardModule.board)
  
  return (
    <div className="board-background">
      {openBackgroundModal && (
        <div
          className={
            openBackgroundModal ? "background-modal" : "background-modal show"
          }
        >
          Background modal
        </div>
      )}
    </div>
  )
}
