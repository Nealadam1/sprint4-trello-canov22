import { ImAttachment } from "react-icons/im"
import { updateCard } from "../../../store/actions/board.action"

export function CardAttachments({ card }) {
  function handleDelete(attachmentId) {
    card.style = {}
    const updatedAttachments = card.attachments.filter(
      (attachment) => attachment.id !== attachmentId
    )
    card.attachments = updatedAttachments
    updateCard(card)
  }

  function handleError(event) {
    event.target.style.display = "none"
    const parent = event.target.parentNode
    const linkText = document.createTextNode("LINK")
    parent.appendChild(linkText)
  }

  // console.log(card.attachments)

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

      {card?.attachments.length > 0 && (
        <button className="grey-button">Add Attachment</button>
      )}
    </section>
  )
}
