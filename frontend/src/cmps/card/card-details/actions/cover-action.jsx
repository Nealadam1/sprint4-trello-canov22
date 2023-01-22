import { useState } from "react";
import { TwitterPicker } from "react-color";
import skeletonCoverPreview from "../../../../assets/img/skeleton-cover-preview.jpg"
import { closeActionModal, updateCard } from "../../../../store/actions/board.action";

export function CoverAction({ card }) {
    const [cardPreviewColor, setCardPreviewColor] = useState(card?.style?.bgColor||'')


    function handleBackgroundChange(backgroundColor) {
        card.style.bgColor=''
        setCardPreviewColor(backgroundColor.hex)
        card.style.bgColor = backgroundColor.hex
        updateCard(card)
    }

    function onRemoveCover(){
        card.style={}
        setCardPreviewColor('')
        updateCard(card)
    }
    

 
    return (
        <section className="add-cover">
            <div className="add-cover-header">
                <h4>Card cover</h4>
                <i onClick={closeActionModal}>X</i>
            </div>
            <div className="add-cover-preview">
                <div
                    className="background-preview"
                    style={{
                        background: cardPreviewColor   
                    }}
                >
                    <img src={skeletonCoverPreview} alt="preview" />
                </div>
            </div>
            <div>
                <div className="button1"
                    onClick={onRemoveCover}>Remove Cover</div>
            </div>
            <div className="background-picker">
                <h5>Background</h5>
                <TwitterPicker
                    color={cardPreviewColor}
                    onChange={handleBackgroundChange}
                />
            </div>
        </section>
    )
}