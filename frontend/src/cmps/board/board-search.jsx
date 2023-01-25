import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { utilService } from "../../services/util.service"
import { BiSearch } from "react-icons/bi"
import { loadBoards } from "../../store/actions/board.action"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

export function BoardSearch({ onSetSearch }) {
  const [search, setSearch] = useState("")
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isSearchTriggered, setIsSearchTriggered] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsSearchTriggered(false)
      setSearch("")
    }
  }, [location.pathname])

  useEffect(() => {
    loadBoards(search)
  }, [search])

  function handleChange({ target }) {
    let { value } = target
    setSearch(value)
    if (value !== "") setIsSearchTriggered(true)
    else setIsSearchTriggered(false)
  }

  return (
    <section className="board-search">
      <form>
        <div className="search-container">
          <span className="search-board-icon">
            <BiSearch />
          </span>
          <input
            className="search-boards-input"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
        </div>
        {isSearchTriggered && (
          <ul className="filtered-results-board">
            <p className="filtered-boards-title">BOARDS</p>
            {boards.map((board) => (
              <li key={board._id} value={board._id}>
                <Link to={`/board/${board._id}`}>
                  <img style={{ width: "55px" }} src={board.style.thumbnail} />
                  <p>{board.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>
    </section>
  )
}
