import React from "react"
import { Link } from "react-router-dom"
export function Home() {
  return (
    <section>
      <h1>Home page</h1>
      <Link to="/board">Board</Link>
    </section>
  )
}
