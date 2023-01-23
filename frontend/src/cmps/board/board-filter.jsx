import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { filterCardsBy } from "../../store/actions/board.action"

export function BoardFilter({ onSetFilter }) {
  const board = useSelector((storeState) => storeState.boardModule.board)
  const [filterBy, setFilterBy] = useState({
    title: "",
    labels: [],
    members: [],
  })

  useEffect(() => {
    filterCardsBy(filterBy)
  }, [filterBy])

  function handleChange({ target }) {
    const { value } = target
    setFilterBy((prev) => ({ ...prev, title: value }))
  }

  function handleCheckbox({ target }) {
    const { value, checked } = target
    if (checked) {
      setFilterBy((prev) => ({ ...prev, labels: [...prev.labels, value] }))
    } else {
      setFilterBy((prev) => ({
        ...prev,
        labels: prev.labels.filter((label) => label !== value),
      }))
    }
  }

  function handleAddMember(memberId) {
    setFilterBy((prev) => {
      if (prev.members.includes(memberId)) {
        return {
          ...prev,
          members: prev.members.filter((member) => member !== memberId),
        }
      } else return { ...prev, members: [...prev.members, memberId] }
    })
  }

  console.log(filterBy)

  return (
    <div className="board-filter">
      <p>Filter</p>
      <label htmlFor="board-input-filter">Keyword</label>
      <input
        placeholder="Enter a keyword..."
        type="text"
        className="blue-input"
        onChange={handleChange}
        name="board-input-filter"
        id="board-input-filter"
      />
      <div className="filter-by-labels">
        <ul>
          <p>Labels</p>
          {board.labels.map((label) => (
            <li style={{ backgroundColor: label.color }}>
              <div>
                <input
                  value={label.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                />
                <span>{label.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p>Members</p>
      <div className="filter-by-members">
        <ul>
          {board.members.map((member) => (
            <li onClick={() => handleAddMember(member._id)}>
              <span>{member.fullname}</span>
              <img style={{ width: "25px" }} src={member.imgUrl} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
