import { GrAttachment } from "react-icons/gr"

export function CardAttachments({ card }) {
  return (
    <section className="card-attachments">
      <h3>
        <i>
          <GrAttachment />
        </i>
        Attachments
      </h3>

      <ul className="attachments-list">
        {card.attachments.map((attachment) => (
          <li key={attachment.id}>
            {/* <Helmet>
                            <meta property="og:image" content={attachment.link} />
                        </Helmet> */}
            <a
              href={attachment.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundImage: `url(${attachment.link})` }}
            >
              {attachment.link}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
