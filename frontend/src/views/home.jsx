import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import heroimg from "../assets/img/home-hero.png"
export function Home() {
  return (
    <section className="home">
      <header className="home-header">
        <div className="logo">
          <Link to="/board">
            <span className="logo-icon">
              <FontAwesomeIcon className="btn-icon" icon={faWeebly} />
            </span>
            <span className="logo-text">orkflow</span>
          </Link>
        </div>

        <div className="user-actions">
          <div className="login">
            <Link to={"/login-signup"}>Log in</Link>
          </div>
          <div className="signup">
            <Link to={"/login-signup"}>Join now</Link>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="main-content">
          <h1>Streamline your work processes With Workflow.</h1>
          <p>
            Introduce the all-in-one task management solution for teams,
            Collaborate in real-time, intuitive interface, added features. Try
            it now and see the difference in your workflows.
          </p>
        </div>
        <div className="get-started">
          <Link to="/board">Get started</Link>
        </div>
        <div className="hero-container">
          <img src={heroimg} alt="" />
        </div>
      </main>
    </section>
  )
}
