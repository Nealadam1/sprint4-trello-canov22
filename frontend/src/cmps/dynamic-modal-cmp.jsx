import { CreateBoard } from "./board/board-create";

export function DynamicActionModal(props) {
    const { buttonRef } = props
    console.log(props)
    switch (props.type) {
        case 'create-board':
            return <section className="action-modal" style={{
                position: 'fixed',
                top: `calc(${buttonRef.getBoundingClientRect().top}px + ${buttonRef.offsetHeight}px)`,
                left: `calc(${buttonRef.getBoundingClientRect().left}px + ${buttonRef.offsetWidth}px)`,
                transform: `translate(0, -${buttonRef.offsetHeight}px)`,
                width:'300px'
            }}>
                <CreateBoard {...props} />
            </section>

    }
}