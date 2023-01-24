import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AppHeader } from "./cmps/app-header"
import { BoardIndex } from "./views/board-index"
import { Home } from "./views/home"
import { BoardDetails } from "./views/board-details"
import { CardDetails } from "./views/card-details"
import { LoginSignup } from "./views/login-signup"
import "./assets/styles/main.scss"

export function App() {
  const location = useLocation()

  return (
    <div className="app">
      {location.pathname !== "/" && <AppHeader />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<BoardIndex />} path="/board" />
        <Route element={<BoardDetails />} path="/board/:boardId">
          <Route element={<CardDetails />} path="/board/:boardId/:cardId" />
        </Route>
        <Route element={<LoginSignup />} path="/login-signup" />
      </Routes>
    </div>
  )
}
