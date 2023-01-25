import { useRef } from "react"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { uploadImg } from "../../../../services/upload.service"
import { closeActionModal, updateCard } from "../../../../store/actions/board.action"

export function AttachmentAction({ card, setCard }) {
    let [imgLink, setImgLink] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)

    function handleSaveLink() {
        card.attachments = [...card.attachments, { link: imgLink }]
        updateCard(card, "ADD_ATTACHMENT")
        closeActionModal()
    }

    function handleLinkChange({target}) {
        setImgLink(target.value)
    }

    function handleFileSelect({ target }) {
        const fileToUpload = target.files[0]
        handleFileUpload(fileToUpload)
    }

    async function handleFileUpload(fileToUpload) {
        try {
            console.log(fileToUpload)
            imgLink = await uploadImg(fileToUpload);
            card.attachments = [...card.attachments, { imgUrl: imgLink }]
            updateCard(card, "ADD_ATTACHMENT")
            closeActionModal()
        } catch (err) {
            console.log(err, 'could not upload img')
        }


    }



    return (
        <section className="add-attachment">
            <header className="add-attchment-header">
                <h4>Attach from...</h4>
                <i onClick={closeActionModal}><CgClose /></i>
            </header>
            <ul className="attach-from">
                <li onClick={() => fileInputRef.current.click()}>Computer</li>
            </ul>
            <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleFileSelect} />
            <div className="add-attachment-link">
                <p>Attach a link</p>
                <form onSubmit={handleSaveLink}>
                    <input className="blue-input" type="text"
                        value={imgLink}
                        onChange={handleLinkChange}
                        placeholder="Insert Image Link"
                        required
                    />
                    <button className="grey-button">Attach</button>
                </form>
            </div>
        </section>
    )
}