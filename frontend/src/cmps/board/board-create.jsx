import { useState } from "react"
import { boardService } from "../../services/board.service"
import { TwitterPicker } from "react-color"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { addBoard, CloseActionModal } from "../../store/actions/board.action"
import skeletonBoardPreview from "../../assets/img/board-preview-skeleton.svg"

export function CreateBoard() {
    const [newBoard, setNewBoard] = useState(boardService.getEmptyBoard())
    const [boardPreviewColor, setBoardPreviewColor] = useState("#24AAE2")

    function handleColorChange(color) {
        setBoardPreviewColor(color.hex)
        newBoard.style.background = color.hex
    }

    console.log(newBoard)

    return (
        <section className="create-board">
            <header className="create-board-header">
                <h4>Create Board</h4>
                <i onClick={CloseActionModal}>X</i>
            </header>

            <div className="create-board-preview">
                <div className="background-preview" style={{ backgroundColor: boardPreviewColor }}>
                    <img src={skeletonBoardPreview} alt="" />
                </div>
            </div>
            <h5>Background</h5>
            <TwitterPicker
                color={boardPreviewColor}
                onChange={handleColorChange}
            />
            <Formik
                initialValues={{ title: "" }}
                validate={(values) => {
                    const errors = {}
                    if (!values.title) {
                        errors.title = "Title is required"
                    }
                    return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                    newBoard.title = values.title
                    addBoard(newBoard)
                    CloseActionModal()
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                         <h5>Board Title</h5>
                        <Field type="text" name="title" placeholder="Enter a title" />
                        <ErrorMessage name="title" component="div" className="error" />
                        <button id="createbtn" className="board-create-button" type="submit" disabled={isSubmitting}>
                            Create
                        </button>

                    </Form>
                )}
            </Formik>
        </section>
    )
}
