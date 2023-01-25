import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { setBoard, updateBoard } from "../../store/actions/board.action"
import { loadUsers } from "../../store/actions/user.action"
import { AiOutlineCheck } from "react-icons/ai"
import { FaUserCheck, FaUserMinus } from "react-icons/fa"
import { MdPersonRemove, MdPersonAddAlt1 } from "react-icons/md"

export function BoardInvite({ board }) {
  const [search, setSearch] = useState("")
  const users = useSelector((storeState) => storeState.userModule.users)
  const [isSearchTriggered, setIsSearchTriggered] = useState(false)
  const [hoveredUserId, setHoveredUserId] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [search])

  function handleChange({ target }) {
    let { value } = target
    setSearch(value)
    if (value !== "") setIsSearchTriggered(true)
    else setIsSearchTriggered(false)
  }

  function handleMember(userId) {
    const selectedUser = users.find((user) => user._id === userId)
    const isUserOnBoard = board.members.some((member) => member._id === userId)
    let updatedBoardMembers
    if (isUserOnBoard) {
      updatedBoardMembers = board.members.filter(
        (member) => member._id !== userId
      )
    } else {
      updatedBoardMembers = [...board.members, selectedUser]
    }
    const updatedBoard = { ...board, members: updatedBoardMembers }
    updateBoard(updatedBoard)
    setBoard(updatedBoard)
  }

  function checkIfUserIsOnBoard(user, board) {
    const isUserOnBoard = board.members.some(
      (member) => member._id === user._id
    )
    return (
      <li key={user._id}>
        <div className="displayed-user">
          <img style={{ width: "30px" }} src={user.imgUrl} />
          <p>{user.fullname}</p>
          {isUserOnBoard && <AiOutlineCheck />}
        </div>
        <div>
          <span
            className="add-user-to-board"
            onClick={() => handleMember(user._id)}
          >
            {isUserOnBoard ? (
              <MdPersonRemove style={{ color: "#a63530" }} />
            ) : (
              <MdPersonAddAlt1 />
            )}
          </span>
        </div>
      </li>
    )
  }

  function removeMember(memberId) {
    console.log(memberId)

    const updatedBoardMembers = board.members.filter(
      (member) => member._id !== memberId
    )
    const updatedBoard = { ...board, members: updatedBoardMembers }
    updateBoard(updatedBoard)
    setBoard(updatedBoard)
  }

  return (
    <div className="board-invite">
      <p>Share board</p>
      <div className="sep-line"></div>
      <input
        style={{ height: "auto" }}
        className="blue-input"
        value={search}
        onChange={handleChange}
        type="text"
      />
      {isSearchTriggered && (
        <ul className="users-list">
          {users && users.length > 0 ? (
            users
              .filter((user) =>
                user?.fullname?.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => checkIfUserIsOnBoard(user, board))
          ) : (
            <h3>No users to show</h3>
          )}
        </ul>
      )}
      <div className="sep-line"></div>
      <h4>Board members</h4>

      <ul className="board-members">
        {board.members.map((member) => (
          <li
            onMouseEnter={() => setHoveredUserId(member._id)}
            onMouseLeave={() => setHoveredUserId(null)}
          >
            <div className="board-members-info">
              <img className="board-member-image" src={member.imgUrl} alt="" />
              <span>{member.fullname}</span>
            </div>
            <div>
              <span className="user-members-icons">
                {hoveredUserId === member._id ? (
                  <FaUserMinus
                    style={{ color: "#a63530" }}
                    onClick={() => removeMember(member._id)}
                  />
                ) : (
                  <FaUserCheck />
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
