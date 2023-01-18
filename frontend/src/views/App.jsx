import React from "react"
import { Route, Routes } from "react-router-dom"
import { AppHeader } from "../cmps/app-header"
import { BoardIndex } from "./board-index"
import { Home } from "./home"
// import { AppHeader } from "./cmps/app-header"
// import { AppFooter } from "./cmps/app-footer"
// import { UserDetails } from "./pages/user-details"
import "./assets/styles/main.scss"
import { BoardDetails } from "./board-details"
import { CardDetails } from "./card-details"

export function App() {
  return (
    <div className="app">
      <AppHeader />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<BoardIndex />} path="/board" />
        <Route element={<BoardDetails />} path="/board/:boardId">
          <Route element={<CardDetails />} path="/board/:boardId/:cardId" />
        </Route>
      </Routes>
    </div>
  )
}