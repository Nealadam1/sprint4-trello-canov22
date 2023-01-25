import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { closeActionModal } from "../../../../store/actions/board.action"

export function AttachmentAction() {
    const [imgLink, setImgLink] = useState('')

    function handleSaveLink() {

    
    }

    function handleLinkChange(){

    }




    return (
        <section className="add-attachment">
            <header className="add-attchment-header">
                <h4>Attach from...</h4>
                <i onClick={closeActionModal}><CgClose /></i>
            </header>
            <ul className="group-actions">
                <li>Computer</li>
            </ul>
            <div className="add-attachment-link">
                <p>Attach a link</p>
                <form onSubmit={handleSaveLink}>
                    <input className="blue-input" type="text"
                        value={imgLink}
                        onChange={handleLinkChange}
                        required
                    />
                    <button className="grey-button">Attach</button>
                </form>
            </div>
        </section>
    )
}