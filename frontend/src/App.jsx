import React from "react"
import { HashRouter as Router, Route, Routes } from "react-router-dom"
// import "./assets/styles/scss/styles.scss"
import { AppHeader } from "./cmps/app-header"
import { BoardIndex } from "./views/board-index"
// import { AppHeader } from "./cmps/app-header"
// import { AppFooter } from "./cmps/app-footer"
// import { UserDetails } from "./pages/user-details"

export function App() {
  return (
    <div className="app">
      <h1>App</h1>
      <AppHeader />
      <Router>
        <Routes>
          <Route element={<BoardIndex />} to="/board" />
        </Routes>
      </Router>
    </div>
  )
}
