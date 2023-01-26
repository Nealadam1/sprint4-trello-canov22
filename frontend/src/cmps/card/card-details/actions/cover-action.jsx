import { useState } from "react"
import { TwitterPicker } from "react-color"
import skeletonCoverPreview from "../../../../assets/img/skeleton-cover-preview.jpg"
import {
  closeActionModal,
  updateCard,
} from "../../../../store/actions/board.action"
import { CgClose } from "react-icons/cg"

export function CoverAction({ card }) {
  const [cardPreviewColor, setCardPreviewColor] = useState(
    card?.style?.bgColor || ""
  )

  function handleBackgroundChange(backgroundColor) {
    setCardPreviewColor(backgroundColor.hex)
    card.style.bgColor = backgroundColor.hex
    updateCard(card, "CHANGE_BACKGROUND")
  }

  function onRemoveCover() {
    card.style = {}
    setCardPreviewColor("")
    updateCard(card, "REMOVE_BACKGROUND")
  }

  return (
    <section className="add-cover">
      <div className="add-cover-header">
        <p>
          Cover
          <i onClick={closeActionModal}>
            <CgClose />
          </i>
        </p>
        <div className="sep-line"></div>
      </div>
      <div className="add-cover-preview">
        <div
          className="background-preview"
          style={{
            background: cardPreviewColor,
          }}
        >
          <img src={skeletonCoverPreview} alt="preview" />
        </div>
      </div>
      <div>
        <div
          style={{ textAlign: "center" }}
          className="grey-button remove-bg-btn"
          onClick={onRemoveCover}
        >
          Remove Cover
        </div>
      </div>
      <div className="background-picker">
        <p style={{ fontSize: "12px", fontFamily: "Open Sans" }}>Background</p>
        <div className="sep-line"></div>

        <TwitterPicker
          colors={[
            "#7BC86C",
            "#F5DD29",
            "#FFAF3F",
            "#EF7564",
            "#CD8DE5",
            "#5BA4CF",
            "#29CCE5",
            "#6DECA9",
            "#FF8ED4",
            "#172B4D",
          ]}
          color={cardPreviewColor}
          onChange={handleBackgroundChange}
        />
      </div>
    </section>
  )
}
