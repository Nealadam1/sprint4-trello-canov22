import React from "react"
import { Route, Routes } from "react-router-dom"
import { AppHeader } from "./cmps/app-header"
import { BoardIndex } from "./views/board-index"
import { Home } from "./views/home"
// import { AppHeader } from "./cmps/app-header"
// import { AppFooter } from "./cmps/app-footer"
// import { UserDetails } from "./pages/user-details"
import "./assets/styles/main.scss"
import { BoardDetails } from "./views/board-details"

export function App() {
  return (
    <div className="app main-container flex">
      <AppHeader />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<BoardIndex />} path="/board" />
        <Route element={<BoardDetails />} path="/board/:boardId" />
      </Routes>
    </div>
  )
}
