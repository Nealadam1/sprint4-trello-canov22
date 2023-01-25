import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { filterCardsBy } from "../../store/actions/board.action"
import { FiCheck } from "react-icons/fi"

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

  return (
    <div className="board-filter">
      <p>Filter</p>
      <div className="sep-line"></div>
      <p className="filter-keyword">Keyword</p>
      <input
        placeholder="Enter a keyword..."
        type="text"
        className="search-input"
        onChange={handleChange}
        name="board-input-filter"
        id="board-input-filter"
      />
      <div className="filter-by-labels">
        <ul className="labels-filter-list">
          <p className="labels-title-filter">Labels</p>
          {board.labels.map((label) => (
            <label key={label.id}>
              <li
                className="label-filter-title-preview"
                style={{ backgroundColor: label.color }}
              >
                <div className="label-item">
                  <input
                    value={label.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                  />
                  <span className="filter-label-title">{label.title}</span>
                </div>
              </li>
            </label>
          ))}
        </ul>
      </div>
      <p>Members</p>
      <div className="filter-by-members">
        <ul>
          {board.members.map((member) => (
            <li onClick={() => handleAddMember(member._id)} key={member._id}>
              <div>
                <img style={{ width: "25px" }} src={member.imgUrl} />
                <span>{member.fullname}</span>
              </div>
              {filterBy.members.includes(member._id) && (
                <div>
                  <span className="filter-member-check">
                    <FiCheck />
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
