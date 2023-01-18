import { useState } from "react"
import { boardService } from "../../services/board.service"
import skeletonBoardPreview from '../../assets/img/board-preview-skeleton.svg'
import { TwitterPicker } from 'react-color'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useSelector } from "react-redux"
import { addBoard } from "../../store/actions/board.action"


export function CreateBoard({setIsCreateBoard  }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [newBoard, setNewBoard] = useState(boardService.getEmptyBoard())
    const [boardPreviewColor, setBoardPreviewColor] = useState('#24AAE2')

    function handleColorChange(color) {
        setBoardPreviewColor(color.hex)
        newBoard.style.background = color.hex
    }

    console.log(newBoard)



    return (
        <section className="create-board">
            <h2>Create Board</h2>
            <Formik
                initialValues={{ title: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Title is required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    
                    newBoard.title = values.title


                    addBoard(newBoard)
                    setIsCreateBoard(false)
                    


                    setSubmitting(false);

                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="create-board-preview">
                            <div className="background-preview" style={{ backgroundColor: boardPreviewColor }}>
                                <img src={skeletonBoardPreview} alt="" />
                            </div>
                            <TwitterPicker color={boardPreviewColor} onChange={handleColorChange} />
                            <Field type="text" name="title" placeholder="Enter a title" />
                            <ErrorMessage name="title" component="div" className="error" />
                            <button type="submit" disabled={isSubmitting}>
                                Create
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}