import { useState } from "react"
import { boardService } from "../../services/board.service"
import { TwitterPicker } from "react-color"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { addBoard, closeActionModal } from "../../store/actions/board.action"
import skeletonBoardPreview from "../../assets/img/board-preview-skeleton.svg"
import { useNavigate } from "react-router"

export function CreateBoard() {
  const [newBoard, setNewBoard] = useState(boardService.getEmptyBoard())
  const [boardPreviewColor, setBoardPreviewColor] = useState('')
  const [boardPreviewImg, setBoardPreviewImg] = useState('')
  const navigate=useNavigate()

  const images = [
    {
      backgroundColor: "#5D7BAD",
      background:
        "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1673050460660-2bd7b3bb25a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      backgroundColor: "#011831",
      background:
        "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1673842450064-e9a1197e1a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      backgroundColor: "#B7F4E0",
      background:
        "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1530968033775-2c92736b131e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
    {
      backgroundColor: "#F2BF0C",
      background:
        "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1510007552638-e1c0c4c67ee0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  ]

  function handleBackgroundChange(backgroundColor, backgroundImg) {
    const { style } = newBoard
    if (backgroundColor) {
      setBoardPreviewColor(backgroundColor.hex)
      if (style.img) style.img=''
      style.backgroundColor = backgroundColor.hex
      setBoardPreviewImg("")
    } else {
      setBoardPreviewImg(backgroundImg.thumbnail)
      style.backgroundColor = backgroundImg.backgroundColor
      style.img = backgroundImg.background
      style.thumbnail = backgroundImg.thumbnail
    }
  }

  async function onCreateBoard(title) {
    newBoard.title = title
    const savedboard= await addBoard(newBoard)
    closeActionModal()
    navigate(`/board/${savedboard._id}`)
    
    
  }

  return (
    <section className="create-board">
      <header className="create-board-header">
        <h4>Create Board</h4>
        <i onClick={closeActionModal}>X</i>
      </header>

      <div className="create-board-preview">
        <div
          className="background-preview"
          style={{
            background: `${
              boardPreviewImg
                ? `url(${boardPreviewImg})`
                : `${boardPreviewColor}`
            }`,
          }}
        >
          <img src={skeletonBoardPreview} alt="preview" />
        </div>
      </div>
      <div className="background-picker">
        <h5>Background</h5>
        <TwitterPicker colors={['#7BC86C', '#F5DD29','#FFAF3F','#EF7564','#CD8DE5','#5BA4CF','#29CCE5','#6DECA9','#FF8ED4','#172B4D']}
          color={boardPreviewColor}
          onChange={handleBackgroundChange}
        />
        <ul className="image-select">
          {images.map((image, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleBackgroundChange(null, image)}
                style={{ backgroundImage: `url(${image.thumbnail})` }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
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
          onCreateBoard(values.title)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h5>Board Title</h5>
            <Field type="text" name="title" placeholder="Enter a title" />
            <ErrorMessage name="title" component="div" className="error" />
            <button 
              id="createbtn"
              className="board-create-button"
              type="submit"
              disabled={isSubmitting}
            >
              Create
            </button >
          </Form>
        )}
      </Formik>
    </section>
  )
}
