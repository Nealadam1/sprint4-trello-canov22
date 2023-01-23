import { useEffect, useRef } from "react";
import { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { setCardToStoreRef, setGroup, updateCard } from "../../../../store/actions/board.action";
import { CardPreview } from "../../card-preview";
import { CardPreviewShortcut } from "../../card-preview-shortcut";
import { LabelPreview } from "../../card-preview/label-preview";

export function CardDetailsShortcut({ card, setEditCardShortcut, group, cardRef }) {
    const [title, setTitle] = useState(card.title)

    setCardToStoreRef(card)
    setGroup(group)


    function handleSave() {
        const updatedCard = card
        updatedCard.title = title
        updateCard(updatedCard)
        setEditCardShortcut(null)
    }


    return (
        <section className="card-detail-shorcut">
            <div className="card-detail-shortcut-menu">
                <DynamicMenuPosition cardRef={cardRef.current}>
                    <ul className="shortcut-actions">
                        <li>
                            Open card
                        </li>
                        <li>
                            Edit labels
                        </li>
                        <li>
                            Change members
                        </li>
                        <li>
                            Change cover
                        </li>
                        <li>
                            Move
                        </li>
                        <li>
                            Copy
                        </li>
                        <li>
                            Archive
                        </li>
                    </ul>
                </DynamicMenuPosition>
            </div>


            <div>

                <CardPreviewShortcut card={card} title={title} setTitle={setTitle} />

            </div>

            <div className="card-detail-shorcut-save">
                <button onClick={handleSave}>Save</button>
            </div>
        </section >

    )
}

const DynamicMenuPosition = (props) => {
    const { cardRef } = props
    const modalRef = useRef(null)
    const [modalStyles, setModalStyles] = useState({
        position: "fixed",
        top: `calc(${cardRef.getBoundingClientRect().top}px + ${cardRef.offsetHeight * 2
            }px)`,
        left: `calc(${cardRef.getBoundingClientRect().left}px `,
        transform:
            cardRef.offsetHeight > 80
                ? `translate(${cardRef.offsetWidth}px, ${cardRef.offsetHeight}px)`
                : `translate(0, -${cardRef.offsetHeight}px)`,
        width: "140px",
    })

    useEffect(() => {
        if (
            modalRef.current &&
            modalRef.current.getBoundingClientRect().bottom > window.innerHeight
        ) {
            setModalStyles({
                ...modalStyles,
                top: `calc(${cardRef.getBoundingClientRect().top}px - ${modalRef.current.offsetHeight / 1.5
                    }px)`,
            })
        }

        if (
            modalRef.current &&
            modalRef.current.getBoundingClientRect().right > window.innerWidth
        ) {
            setModalStyles({
                ...modalStyles,
                left: `calc(${cardRef.getBoundingClientRect().left}px - ${modalRef.current.offsetWidth
                    }px)`,
            })
        }

    }, [modalRef, modalStyles, cardRef])

    return (
        <section ref={modalRef} style={modalStyles}>
            {props.children}
        </section>
    )
}
