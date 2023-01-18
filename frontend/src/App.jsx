import React from "react"
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import "./assets/styles.css"
import { AppHeader } from "./cmps/app-header"
import { Provider } from "react-redux"
import { BoardIndex } from "./views/board-index"
import { Home } from "./views/home"
// import { AppHeader } from "./cmps/app-header"
// import { AppFooter } from "./cmps/app-footer"
// import { UserDetails } from "./pages/user-details"

export function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<BoardIndex />} path="/board" />
        </Routes>
      </div>
    </Router>
  )
}
