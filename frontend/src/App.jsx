import React from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AppHeader } from "./cmps/app-header"
import { BoardIndex } from "./views/board-index"
import { Home } from "./views/home"
import { BoardDetails } from "./views/board-details"
import { CardDetails } from "./views/card-details"
import { BoardDashboard } from "./cmps/board/board-dashboard"
import "./assets/styles/main.scss"
import { GroupList } from "./cmps/group/group-list"
import { Login } from "./views/login"
import { Signup } from "./views/signup"

export function App() {
  const location = useLocation()

  return (
    <div className="app">
      {location.pathname !== "/" && <AppHeader />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<BoardIndex />} path="/board" />
        <Route element={<BoardDetails />} path="/board/:boardId">
          <Route
            element={<BoardDashboard />}
            path="/board/:boardId/dashboard"
          />
          <Route element={<GroupList />} path="/board/:boardId">
            <Route element={<CardDetails />} path="/board/:boardId/:cardId" />
          </Route>
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </div>
  )
}
