import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { closeActionModal } from "../store/actions/board.action"
import { CreateBoard } from "./board/board-create"
import { BoardFilter } from "./board/board-filter"
import { BoardInvite } from "./board/board-invite"
import { ChecklistAction } from "./card/card-details/actions/checklist-action"
import { CoverAction } from "./card/card-details/actions/cover-action"
import { DateAction } from "./card/card-details/actions/date-action"
import { LabelAction } from "./card/card-details/actions/label-action"
import { MemberAction } from "./card/card-details/actions/member-action"
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
    case "group-actions":
      return (
        modal === props.type && (
          <DynamicModalPosition buttonRef={buttonRef}>
            <GroupActions {...props} />
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
  const [modalStyles, setModalStyles] = useState({
    position: "fixed",
    top: `calc(${buttonRef.getBoundingClientRect().top}px + ${
      buttonRef.offsetHeight * 2
    }px)`,
    left: `calc(${buttonRef.getBoundingClientRect().left}px `,
    transform:
      buttonRef.offsetHeight > 80
        ? `translate(${buttonRef.offsetWidth}px, ${buttonRef.offsetHeight}px)`
        : `translate(0, -${buttonRef.offsetHeight}px)`,
    width: "300px",
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
      modalRef.current.getBoundingClientRect().bottom > window.innerHeight
    ) {
      setModalStyles({
        ...modalStyles,
        top: `calc(${buttonRef.getBoundingClientRect().top}px - ${
          modalRef.current.offsetHeight / 1.5
        }px)`,
      })
    }

    if (
      modalRef.current &&
      modalRef.current.getBoundingClientRect().right > window.innerWidth
    ) {
      setModalStyles({
        ...modalStyles,
        left: `calc(${buttonRef.getBoundingClientRect().left}px - ${
          modalRef.current.offsetWidth
        }px)`,
      })
    }
  }, [modalRef, buttonRef])

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
        zIndex:5
      }}
      onClick={handleClose}
    >
      <section className="action-modal" ref={modalRef} style={modalStyles}>
        {props.children}
      </section>
    </div>
  )
}
