import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { closeActionModal } from "../store/actions/board.action"
import { CreateBoard } from "./board/board-create"
import { BoardFilter } from "./board/board-filter"
import { BoardInvite } from "./board/board-invite"
import { StarredBoards } from "./board/board-starred"
import { AttachmentAction } from "./card/card-details/actions/attachment-action"
import { ChecklistAction } from "./card/card-details/actions/checklist-action"
import { CoverAction } from "./card/card-details/actions/cover-action"
import { DateAction } from "./card/card-details/actions/date-action"
import { LabelAction } from "./card/card-details/actions/label-action"
import { MemberAction } from "./card/card-details/actions/member-action"
import { MoveAction } from "./card/card-details/actions/move-action"
import { GroupActions } from "./group/group-actions"

export function DynamicActionModal(props) {
  const { buttonRef } = props

  const modal = useSelector(
    (storeState) => storeState.systemModule.isActionModal
  )
  switch (props.type) {
    case "create-board":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <CreateBoard {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-members":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <MemberAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-members2":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <MemberAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "board-filter":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <BoardFilter {...props} />
          </DynamicModalPosition>
        )
      )
    case "board-invite":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <BoardInvite {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-checklist":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <ChecklistAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-labels":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <LabelAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-labels2":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <LabelAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-cover":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <CoverAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-date":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <DateAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-attachment":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <AttachmentAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "add-attachment2":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <AttachmentAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "move-card":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <MoveAction {...props} />
          </DynamicModalPosition>
        )
      )
    case "group-actions":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <GroupActions {...props} />
          </DynamicModalPosition>
        )
      )
    case "starred-boards":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <StarredBoards {...props} />
          </DynamicModalPosition>
        )
      )
    default:
      return
  }
}

const DynamicModalPosition = (props) => {
  const { buttonRef } = props
  const modalRef = useRef(null)
  let [modalStyles, setModalStyles] = useState({
    position: "fixed",
    top: `calc(${buttonRef.getBoundingClientRect().top}px + ${buttonRef.offsetHeight * 2
      }px)`,
    left: `calc(${buttonRef.getBoundingClientRect().left}px `,
    transform:
      buttonRef.offsetHeight > 90
        ? `translate(${buttonRef.offsetWidth}px, -${buttonRef.offsetHeight * 2}px)`
        : `translate(0, -${buttonRef.offsetHeight}px)`,
    width: "300px",
    opacity: 0
  })
  function handleClose(ev) {
    ev.stopPropagation()

    if (ev.target === ev.currentTarget) {
      closeActionModal()
    }
  }

  useEffect(() => {
      if (
        modalRef.current &&
        (modalRef.current.getBoundingClientRect().bottom) > window.innerHeight
      ) {
        console.log('hello')
        modalStyles={
          ...modalStyles,
          top: `calc(${buttonRef.getBoundingClientRect().top}px - ${modalRef.current.offsetHeight*0.5
            }px)`,
           
        }
      }

      if (
        modalRef.current &&
        modalRef.current.getBoundingClientRect().right > window.innerWidth
      ) {
        console.log('hello2')
        modalStyles={
          ...modalStyles,
          left: `calc(${buttonRef.getBoundingClientRect().left}px - ${modalRef.current.offsetWidth/2
            }px)`,
          
        }
      }
      setModalStyles({
        ...modalStyles, opacity: 1
      })
  }, [modalRef,buttonRef])

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "default",
        zIndex: 5
      }}
      onClick={handleClose}
    >
      <section className="action-modal" ref={modalRef} style={modalStyles}>
        {props.children}
      </section>
    </div>
  )
}
