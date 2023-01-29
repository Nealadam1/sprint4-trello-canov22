import { useRef } from "react"
import { ImAttachment } from "react-icons/im"
import { useSelector } from "react-redux"
import { OpenActionModal, updateCard } from "../../../store/actions/board.action"
import { DynamicActionModal } from "../../dynamic-modal-cmp"

export function CardAttachments({ card }) {
    const isActionModal = useSelector(
        (storeState) => storeState.systemModule.isActionModal
    )
    const buttonRefAttachment = useRef(null)

    function handleDelete(attachmentId) {
        card.style = {}
        const updatedAttachments = card.attachments.filter(attachment => attachment.id !== attachmentId)
        card.attachments = updatedAttachments
        updateCard(card)
    }

  function handleError(event) {
    event.target.style.display = "none"
    const parent = event.target.parentNode
    const linkText = document.createTextNode("LINK")
    parent.appendChild(linkText)
  }

  return (
    <section className="card-attachments">
      <h3>
        <i>
          <ImAttachment />
        </i>
        Attachments
      </h3>
      <ul className="attachments-list">
        {card.attachments.map((attachment) => (
          <li className="attachment-preview" key={attachment.id}>
            <div className="attachment-img">
              {attachment?.imgUrl && (
                <img src={attachment.imgUrl} onError={handleError}></img>
              )}
              {attachment?.link && (
                <img src={attachment.link} onError={handleError}></img>
              )}
            </div>
            <div className="attachment-details">
              <h3>{attachment.name}</h3>
              <a
                href={attachment.link ? attachment.link : attachment.imgUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attachment.link
                  ? attachment.link.substring(0, 40)
                  : attachment.imgUrl.substring(0, 40)}
                ...
              </a>
              <div className="attachment-actions">
                <p
                  className="delete-attachment"
                  onClick={() => handleDelete(attachment.id)}
                >
                  Remove
                </p>
                <p
                  className="delete-cover"
                  onClick={() => handleDelete(attachment.id)}
                >
                  Remove cover
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

            {card?.attachments.length > 0 &&
                <div>
                    <button
                        className="grey-button attachment-btn"
                        ref={buttonRefAttachment}
                        onClick={
                            !isActionModal ? (ev) => OpenActionModal(ev, "add-attachment2") : null
                        }
                    >
                        {isActionModal && (
                            <DynamicActionModal
                                card={card}
                                buttonRef={buttonRefAttachment.current}
                                type={"add-attachment2"}
                            />
                        )}
                        <span className="checklist-icon side-bar-icon">
                            <ImAttachment />
                        </span>
                        Add Attachment
                       
                    </button>
                </div>
            }





        </section>
    )

}
