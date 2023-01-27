/* eslint-disable jsx-a11y/alt-text */
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
  const [activitesMenu, setActivitesMenu] = useState(true)
  const [unsplashImages, setUnsplashImages] = useState([])

  function handleUnsplash() {
    setUnsplashMenu(true)
    const unsplashImages = utilService.loadFromStorage("unsplash")
    if (unsplashImages) {
      setUnsplashImages(unsplashImages)
      return
    }
    const apiKey = "MBnE1-xZ0kaxsHG3axcPYu0Z1K6K57Wimfo-j3-VlGc"
    const query = "nature"
    const numberOfImages = 30
    fetch(
      `https://api.unsplash.com/search/photos?query=${query}w=1920&h=1020&per_page=${numberOfImages}&client_id=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const images = data?.results?.map((image) => image.urls.regular)
        setUnsplashImages(images)
        utilService.saveToStorage("unsplash", images)
      })
  }

  const colorsBackground = [
    "rgb(0, 121, 191)",
    "rgb(210, 144, 52)",
    "rgb(81, 152, 57)",
    "rgb(176, 70, 50)",
    "rgb(137, 96, 158)",
    "rgb(205, 90, 145)",
    "rgb(75, 191, 107)",
    "rgb(0, 174, 204)",
    "rgb(131, 140, 145)",
  ]

  function setBackgroundImage(image) {
    const thumbnailImage = image.replace("w=1080", "w=200")
    console.log(thumbnailImage)
    const updatedBoard = {
      ...board,
      style: { img: image, thumbnail: thumbnailImage },
    }
    setBoard(updatedBoard)
    updateBoard(updatedBoard)
  }

  function setBackgroundColor(color) {
    const updatedBoard = {
      ...board,
      style: { backgroundColor: color, thumbnail: color },
    }
    setBoard(updatedBoard)
    updateBoard(updatedBoard)
  }

  function handleActivitesPage() {
    setOpenBackground(true)
    setActivitesMenu(false)
  }

  function handleBackgroundPage() {
    setOpenBackground(false)
    setActivitesMenu(true)
  }

  useEffect(() => {
    if (modalRef.current.scrollHeight > modalRef.current.clientHeight) {
      modalRef.current.style.overflowY = "scroll"
    }
  }, [board.activities.length])

  return (
    <div ref={modalRef} className="card-activites">
      {!openBackground && !unsplashMenu && !colorsMenu && activitesMenu && (
        <div>
          <p className="activities-menu-title">Menu</p>
          <div className="sep-line"></div>
          <div className="board-background">
            <div className="change-bg-btn">
              <div
                style={{
                  borderRadius: "5px",
                  width: "20px",
                  height: "20px",
                  background: board?.style?.backgroundColor,
                  backgroundImage: board?.style?.thumbnail
                    ? `url(${board.style.thumbnail})`
                    : "none",
                  backgroundSize: "cover",
                }}
              />
              <button
                onClick={handleActivitesPage}
                className="board-background-btn"
              >
                Change background
              </button>
            </div>
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
      {!unsplashMenu && !colorsMenu && !activitesMenu && (
        <div className="change-background-menu">
          <p className="background-menu-title">
            <span onClick={handleBackgroundPage} className="back-to-menu-btn">
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
              Unsplash
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
            {colorsBackground.map((color) => {
              return (
                <div
                  onClick={() => setBackgroundColor(color)}
                  style={{ background: color }}
                  className="option"
                ></div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
