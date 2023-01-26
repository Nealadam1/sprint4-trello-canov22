import { useRef } from "react"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { uploadImg } from "../../../../services/upload.service"
import { utilService } from "../../../../services/util.service"
import { closeActionModal, updateCard } from "../../../../store/actions/board.action"

export function AttachmentAction({ card, setCard }) {
    let [imgLink, setImgLink] = useState('')
    const [LinkName, setLinkName] = useState('')
    const fileInputRef = useRef(null)

    function handleSaveLink() {
        card.style = { bgColor: "#fffff" }
        card.attachments = [...card.attachments, { id: utilService.makeId(), link: imgLink, name: LinkName }]
        updateCard(card, "ADD_ATTACHMENT")
        closeActionModal()
    }

    function handleLinkChange({ target }) {
        setImgLink(target.value)
    }

    function handleFileSelect({ target }) {
        const fileToUpload = target.files[0]
        handleFileUpload(fileToUpload)
    }

    function handleNameChange({ target }) {
        setLinkName(target.value)
    }

    async function handleFileUpload(fileToUpload) {
        try {
            console.log(fileToUpload)
            imgLink = await uploadImg(fileToUpload);
            card.attachments = [...card.attachments, { id: utilService.makeId(), imgUrl: imgLink, name: fileToUpload.name }]
            closeActionModal()
            card.style = { bgColor: "#fffff" }
            updateCard(card, "ADD_ATTACHMENT")
        } catch (err) {
            console.log(err, 'could not upload img')
        }


    }



    return (
        <section className="add-attachment">
            <div className="add-attachment-header">
                <h4>Attach from...</h4>
                <i onClick={closeActionModal}><CgClose /></i>
            </div>
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
                        placeholder="Insert link..."
                        required
                    />
                    {imgLink &&
                        <div>
                            <p>{`Link name (optianal)`}</p>
                            <input className="blue-input" type="text"
                                value={LinkName}
                                onChange={handleNameChange}
                                placeholder="Name..."
                                required
                            />
                        </div>
                    }
                    <button className="grey-button">Attach</button>
                </form>
            </div>
        </section>
    )
}