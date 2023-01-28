import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadBoards } from "../../store/actions/board.action"

export function RecentBoards() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const user = useSelector((storeState) => storeState.userModule.user)
  let filteredBoards = []

  useEffect(() => {
    loadBoards()
  }, [])


  if (user?.visitedBoards) {
    filteredBoards = user.visitedBoards.map(visitedBoard => {
      const boardIndex = boards.findIndex(board => board._id === visitedBoard)
      if (boards[boardIndex]===undefined) return user.visitedBoards=[]
      return boards[boardIndex]
    });

  }

  console.log(filteredBoards)





  return (
    <>
      {!user && <p>
        Must be logged in</p>}
        {filteredBoards.length===0&& <p>No Boards Were Viewed Yet</p>}


      {user?.visitedBoards.length>0 && (
        <ul className="board-starred-list">
          {filteredBoards.map((board) => (
            <li className="board-starred-item" key={board._id}>
              <Link
                className="board-starred-item-preview"
                to={`/board/${board._id}`}
              >
                <div
                  style={{
                    background: `${board.style.thumbnail
                        ? `url(${board.style.thumbnail})`
                        : `${board.style.backgroundColor}`
                      }`,
                  }}
                ></div>
                <p>{board.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
