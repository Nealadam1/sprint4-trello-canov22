import { CreateBoard } from "./board/board-create"
import { MemberAction } from "./card/card-details/actions/member-action"

export function DynamicActionModal(props) {
  const { buttonRef } = props
  switch (props.type) {
    case "create-board":
      return (
        <section
          className="action-modal"
          style={{
            position: "fixed",
            top: `calc(${buttonRef.getBoundingClientRect().top}px + ${
              buttonRef.offsetHeight
            }px)`,
            left: `calc(${buttonRef.getBoundingClientRect().left}px + ${
              buttonRef.offsetWidth
            }px)`,
            transform: `translate(0, -${buttonRef.offsetHeight}px)`,
            width: "300px",
          }}
        >
          <CreateBoard {...props} />
        </section>
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
  return (
    <section
      className="action-modal"
      style={{
        position: "fixed",
        top: `calc(${buttonRef.getBoundingClientRect().top}px + ${
          buttonRef.offsetHeight
        }px)`,
        left: `calc(${buttonRef.getBoundingClientRect().left}px + ${
          buttonRef.offsetWidth
        }px)`,
        transform: `translate(0, -${buttonRef.offsetHeight}px)`,
        width: "300px",
      }}
    ></section>
  )
}
