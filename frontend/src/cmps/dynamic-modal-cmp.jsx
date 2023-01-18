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
                transform: `translate(${buttonRef.offsetWidth}px, -${buttonRef.offsetHeight}px)`,
                maxWidth: `calc(50% - ${buttonRef.getBoundingClientRect().left}px)`
            }}>
                <CreateBoard {...props} />
            </section>

    }
}