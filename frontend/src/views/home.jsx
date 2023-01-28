import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Link } from "react-router-dom"
import heroimg from "../assets/img/TrelloUICollage_4x.png"
import waveImg from "../assets/img/white-wave-bg.svg"
import exampleImg from "../assets/img/workflow-example.png"
export function Home() {
  return (
    <section className="home">
      <section className="hero">
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
            <Link className="login" to={"/login-signup"}>Log in</Link>
            <Link className="signup" to={"/login-signup"}>Get Workflow for free</Link>
          </div>
        </header>
        <main className="main">
          <div className="main-content">
            <div className="hero-text">
              <h1>Workflow brings all your tasks, teammates, and tools together</h1>
              <p>
                Keep everything in the same place—even if your team isn’t.
              </p>
              <div className="get-started">
                <Link to="/board">Get started</Link>
              </div>
            </div>

            <div className="hero-container">
              <img src={heroimg} alt="" />
            </div>

          </div>

        </main>

        <img className="wave" src={waveImg}></img>
      </section>
      <section className="details">
        <h4>Workflow 101</h4>
        <h1>A productivity powerhouse</h1>
        <p>
          Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing what and what needs to get done. Learn more in our guide for getting started.
        </p>
      </section>
      <section className="example">
        <div className="example-container">
          <div className="example-text">
            <div className="example-item">
              <h5>Boards</h5>
              <p>Workflow boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
            </div>
            <div className="example-item">
              <h5>Lists</h5>
              <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.</p>
            </div>
            <div className="example-item">
              <h5>Cards</h5>
              <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
            </div>

          </div>
          <div className="example-img">
            <img src={exampleImg} alt="" />

          </div>
        </div>
      </section>
    </section>

  )

}
