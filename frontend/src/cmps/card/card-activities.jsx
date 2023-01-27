import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"
import { CardChangeBg } from "./card-preview/card-changeBg"
import { RxActivityLog } from "react-icons/rx"
import { BoardBackground } from "../board/board-background"
import { MdArrowBackIos } from "react-icons/md"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import backgroundImage from "../../assets/img/background-pexels.jpg"

export function CardActivites() {
  const modalRef = useRef(null)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [openBackground, setOpenBackground] = useState(false)
  const [unsplashMenu, setUnsplashMenu] = useState(false)
  const [colorsMenu, setColorsMenu] = useState(false)
  const [unsplashImages, setUnsplashImages] = useState([])

  function handleUnsplash() {
    setUnsplashMenu(true)
    const unsplashImages = utilService.loadFromStorage("unsplash")
    if (unsplashImages) {
      console.log("didnt get out")

      setUnsplashImages(unsplashImages)
      return
    }

    console.log("did get out")

    const apiKey = "MBnE1-xZ0kaxsHG3axcPYu0Z1K6K57Wimfo-j3-VlGc"
    const query = "nature"
    const numberOfImages = 30

    fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${numberOfImages}&client_id=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const images = data?.results?.map((image) => image.urls.small)
        setUnsplashImages(images)
        console.log("hi")
        utilService.saveToStorage("unsplash", images)

        // Use the images URLs to display the images in your app
      })
  }

  function setBackgroundImage(image) {
    if (board?.style?.img) board.style.img = image
    setBoard(board)
    updateBoard(board)
  }

  useEffect(() => {
    if (modalRef.current.scrollHeight > modalRef.current.clientHeight) {
      modalRef.current.style.overflowY = "scroll"
    }
  }, [board.activities.length])
  return (
    <div ref={modalRef} className="card-activites">
      {!openBackground && !unsplashMenu && !colorsMenu && (
        <div>
          <p className="activities-menu-title">Menu</p>
          <div className="sep-line"></div>
          <div className="board-background">
            <img
              style={{ width: "25px" }}
              src={board?.style?.thumbnail || board?.style?.background}
              alt=""
            />
            <button
              onClick={() => setOpenBackground(true)}
              className="board-background-btn"
            >
              Change background
            </button>
          </div>
          <BoardBackground />
          <div className="activity-title">
            <span>
              <RxActivityLog />
            </span>
            <p className="activities-title">Activity</p>
          </div>
          <ul>
            {board.activities.map((activitie) => {
              // console.log(activitie)
              return (
                <li className="activitie" key={activitie.id}>
                  <div className="user-activitie-img">
                    <img src={activitie.userImage} />
                  </div>
                  <div className="user-activitie-info">
                    <p>
                      <b>{activitie.fullname}</b> {activitie.data}{" "}
                      {activitie.text}
                    </p>
                    <span className="activitie-time">
                      {utilService.formatTime(activitie.createdAt)}
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {!unsplashMenu && !colorsMenu && (
        <div className="change-background-menu">
          <p className="background-menu-title">
            <span
              onClick={() => setOpenBackground(false)}
              className="back-to-menu-btn"
            >
              <MdArrowBackIos />
            </span>
            Change background
          </p>
          <div className="sep-line"></div>
          <div className="container">
            <img
              style={{ height: "100px" }}
              src={
                "https://a.trellocdn.com/prgb/assets/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg"
              }
              onClick={handleUnsplash}
              className="option change-by-photos"
            ></img>
            <img
              onClick={() => setColorsMenu(true)}
              style={{ height: "100px" }}
              src={
                "https://a.trellocdn.com/prgb/assets/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg"
              }
              className="option change-by-color"
            ></img>
          </div>
          <div className="board-option-names">
            <p>Photos</p>
            <p>Colors</p>
          </div>
        </div>
      )}
      {!colorsMenu && unsplashMenu && (
        <div>
          <p className="background-menu-title">
            <span
              onClick={() => setUnsplashMenu(false)}
              className="back-to-menu-btn"
            >
              <MdArrowBackIos />
            </span>
            Photos by
            <span style={{ textDecoration: "underline", marginLeft: "0.3em" }}>
              Unslpash
            </span>
          </p>
          <div className="sep-line"></div>
          <div className="unsplash-container">
            {unsplashImages.map((image, idx) => {
              return (
                <div
                  style={{ maxHeight: "100px" }}
                  onClick={() => setBackgroundImage(image)}
                  key={idx}
                >
                  <img
                    className="option"
                    style={{ maxHeight: "100px" }}
                    src={image}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {colorsMenu && (
        <div>
          <p className="background-menu-title">
            <span
              onClick={() => setColorsMenu(false)}
              className="back-to-menu-btn"
            >
              <MdArrowBackIos />
            </span>
            Colors
          </p>
          <div className="sep-line"></div>
          <div className="colors-container">
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(210, 144, 52)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(81, 152, 57)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(176, 70, 50)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
            <div
              style={{ backgroundColor: "rgb(0, 121, 191)" }}
              className="option"
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}
