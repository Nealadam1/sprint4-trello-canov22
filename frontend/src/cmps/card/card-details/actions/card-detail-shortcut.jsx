import { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { CardPreview } from "../../card-preview";
import { CardPreviewShortcut } from "../../card-preview-shortcut";
import { LabelPreview } from "../../card-preview/label-preview";

export function CardDetailsShortcut({ card }) {
    const [title, setTitle] = useState(card.title)
    return (
        <section className="card-detail-shorcut">
            <div>
                <CardPreviewShortcut card={card} title={title} setTitle={setTitle} />
            </div>
            <div className="card-detail-shortcut-menu">
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
            </div>
            <div className="card-detail-shorcut-save">
                <button>Save</button>
            </div>
        </section >
    )
}