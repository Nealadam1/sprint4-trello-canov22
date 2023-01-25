
import { GrAttachment } from "react-icons/gr"
import { updateCard } from "../../../store/actions/board.action";

export function CardAttachments({ card }) {

    function handleDelete(attachmentId){
       const updatedCard=card.attachments.filter(attachment=> attachment.id !== attachmentId)
       updateCard(updatedCard)
    }

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
                        <a href={attachment.link} target="_blank" rel="noopener noreferrer">
                            <div className="attachment-preview">
                                {attachment?.imgUrl&& <img src={attachment.imgUrl}></img>}
                                {attachment?.link&& <img src={attachment.link}></img>}

                            </div>
                            <div className="attachment-details">
                                <p>{attachment.name}</p>
                                <span>{attachment.link}</span>
                                <p className="delete-attachment"
                                onClick={()=>handleDelete(attachment.id)}
                                >Delete</p>
                                <p className="delete-cover"
                                onClick={()=>handleDelete(attachment.id)}
                                >Remove cover</p>
                            </div>
                        </a>
                    </li>

                ))}
            </ul>

           {card?.attachments.length>0 && <button className="grey-button">Add Attachment</button>}




        </section>
    )

}