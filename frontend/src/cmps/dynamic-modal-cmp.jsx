import { useEffect, useRef, useState } from "react"
import { CreateBoard } from "./board/board-create"
import { MemberAction } from "./card/card-details/actions/member-action"

export function DynamicActionModal(props) {
  const { buttonRef } = props
  console.log(props)
  switch (props.type) {
    case "create-board":
      return (
        <DynamicModalPosition buttonRef={buttonRef}>
          <CreateBoard {...props} />
        </DynamicModalPosition>
      )
    case "add-members":
      return (
        <section
          className="action-modal"
        // style={{
        //   position: "fixed",
        //   top: `calc(${buttonRef.getBoundingClientRect().top}px + ${
        //     buttonRef.offsetHeight
        //   }px)`,
        //   left: `calc(${buttonRef.getBoundingClientRect().left}px + ${
        //     buttonRef.offsetWidth
        //   }px)`,
        //   transform: `translate(0, -${buttonRef.offsetHeight}px)`,
        //   width: "300px",
        // }}
        >
          <MemberAction {...props} />
        </section>
      )
  }
}

const DynamicModalPosition = (props) => {
  const { buttonRef } = props
  const modalRef = useRef(null)
  const [modalStyles, setModalStyles] = useState({
    position: "fixed",
    top: `calc(${buttonRef.getBoundingClientRect().top}px + ${buttonRef.offsetHeight}px)`,
    left: `calc(${buttonRef.getBoundingClientRect().left}px + ${buttonRef.offsetWidth}px)`,
    transform: `translate(0, -${buttonRef.offsetHeight}px)`,
    width: "300px",
  });

  useEffect(() => {
    if (modalRef.current && (modalRef.current.getBoundingClientRect().bottom > window.innerHeight)) {
      setModalStyles({
        ...modalStyles,
        top: `calc(${buttonRef.getBoundingClientRect().top}px - ${modalRef.current.offsetHeight/1.5}px)`
      })
    }

    if (modalRef.current && (modalRef.current.getBoundingClientRect().right > window.innerWidth)) {
      setModalStyles({
        ...modalStyles,
        left: `calc(${buttonRef.getBoundingClientRect().left}px - ${modalRef.current.offsetWidth}px)`
      })
    }
  }, [modalRef, modalStyles, buttonRef])

  return (
    <section
      className="action-modal"
      ref={modalRef}
      style={modalStyles}
    >
      {props.children}
    </section>
  );
};